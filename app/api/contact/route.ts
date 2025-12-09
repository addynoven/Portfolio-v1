import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { checkRateLimit, recordSubmission, formatRetryAfter } from '@/lib/rate-limiter';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

function validateFormData(data: unknown): { valid: true; data: ContactFormData } | { valid: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }
  
  const form = data as Record<string, unknown>;
  
  if (!form.firstName || typeof form.firstName !== 'string' || form.firstName.trim().length < 1) {
    return { valid: false, error: 'First name is required' };
  }
  
  if (!form.lastName || typeof form.lastName !== 'string' || form.lastName.trim().length < 1) {
    return { valid: false, error: 'Last name is required' };
  }
  
  if (!form.email || typeof form.email !== 'string' || !form.email.includes('@')) {
    return { valid: false, error: 'Valid email is required' };
  }
  
  if (!form.message || typeof form.message !== 'string' || form.message.trim().length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters' };
  }
  
  return {
    valid: true,
    data: {
      firstName: String(form.firstName).trim(),
      lastName: String(form.lastName).trim(),
      email: String(form.email).trim().toLowerCase(),
      phone: form.phone ? String(form.phone).trim() : undefined,
      service: form.service ? String(form.service).trim() : undefined,
      message: String(form.message).trim(),
    },
  };
}

function getClientIP(request: NextRequest): string {
  // Try various headers for client IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Fallback
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate form data
    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }
    
    const { data: formData } = validation;
    const clientIP = getClientIP(request);
    
    // Check rate limits
    const rateLimitResult = checkRateLimit(formData.email, clientIP);
    if (!rateLimitResult.allowed) {
      const retryAfter = formatRetryAfter(rateLimitResult.retryAfterMs || 3600000);
      const message = rateLimitResult.reason === 'email_limit'
        ? `You've already sent a message recently. Please try again in ${retryAfter}.`
        : `Too many messages from your network. Please try again in ${retryAfter}.`;
      
      return NextResponse.json(
        { success: false, error: message, rateLimited: true },
        { status: 429 }
      );
    }
    
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Email service is not configured' },
        { status: 500 }
      );
    }
    
    // Send email
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use verified domain in production
      to: 'dmcbaditya@gmail.com',
      replyTo: formData.email,
      subject: `Portfolio Contact: ${formData.service || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00ff99; border-bottom: 2px solid #00ff99; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.firstName} ${formData.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${formData.email}">${formData.email}</a>
              </td>
            </tr>
            ${formData.phone ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.phone}</td>
            </tr>
            ` : ''}
            ${formData.service ? `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${formData.service}</td>
            </tr>
            ` : ''}
          </table>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
${formData.message}
            </div>
          </div>
          
          <p style="margin-top: 30px; color: #666; font-size: 12px;">
            Sent from your portfolio contact form • IP: ${clientIP}
          </p>
        </div>
      `,
    });
    
    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }
    
    // Record successful submission for rate limiting
    recordSubmission(formData.email, clientIP);
    
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully!',
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
