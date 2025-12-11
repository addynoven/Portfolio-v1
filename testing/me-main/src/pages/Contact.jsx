import React, { useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [focusedField, setFocusedField] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  useGSAP(() => {
    const tl = gsap.timeline()
    
    tl.from('.contact-title', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    })
    
    tl.from('.contact-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    
    tl.from('.form-group', {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3')
    
    tl.from('.social-links', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.3')
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: import.meta.env.VITE_EMAIL_TO,
      }

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('')
      }, 5000)
    } catch (error) {
      console.error('Email send failed:', error)
      setSubmitStatus('error')
      
      setTimeout(() => {
        setSubmitStatus('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <div className='min-h-screen flex items-center justify-center px-6 py-20 md:px-12'>
      <div className='w-full max-w-4xl'>
        {/* Header */}
        <div className='mb-12 md:mb-16'>
          <h1 className='contact-title text-5xl md:text-7xl lg:text-8xl font-[font1] text-[#00f050] mb-4'>
            GET IN TOUCH
          </h1>
          <p className='contact-subtitle text-lg md:text-xl text-[#c8c8c8]/60 max-w-2xl'>
            Have a project in mind? Let's create something amazing together.
          </p>
        </div>


        <form onSubmit={handleSubmit} className='space-y-8 mb-16'>
          <div className='form-group'>
            <label 
              htmlFor='name' 
              className={`block text-sm md:text-base font-[font2] mb-2 transition-colors duration-300 ${
                focusedField === 'name' ? 'text-[#00f050]' : 'text-[#c8c8c8]/60'
              }`}
            >
              NAME
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              autoComplete='name'
              className='w-full bg-transparent border-b-2 border-[#c8c8c8]/20 focus:border-[#00f050] outline-none py-3 text-white text-lg md:text-xl transition-all duration-300'
              required
            />
          </div>

          <div className='form-group'>
            <label 
              htmlFor='email' 
              className={`block text-sm md:text-base font-[font2] mb-2 transition-colors duration-300 ${
                focusedField === 'email' ? 'text-[#00f050]' : 'text-[#c8c8c8]/60'
              }`}
            >
              EMAIL
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              autoComplete='email'
              className='w-full bg-transparent border-b-2 border-[#c8c8c8]/20 focus:border-[#00f050] outline-none py-3 text-white text-lg md:text-xl transition-all duration-300'
              required
            />
          </div>

          <div className='form-group'>
            <label 
              htmlFor='subject' 
              className={`block text-sm md:text-base font-[font2] mb-2 transition-colors duration-300 ${
                focusedField === 'subject' ? 'text-[#00f050]' : 'text-[#c8c8c8]/60'
              }`}
            >
              SUBJECT
            </label>
            <input
              type='text'
              id='subject'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              className='w-full bg-transparent border-b-2 border-[#c8c8c8]/20 focus:border-[#00f050] outline-none py-3 text-white text-lg md:text-xl transition-all duration-300'
              required
            />
          </div>

          <div className='form-group'>
            <label 
              htmlFor='message' 
              className={`block text-sm md:text-base font-[font2] mb-2 transition-colors duration-300 ${
                focusedField === 'message' ? 'text-[#00f050]' : 'text-[#c8c8c8]/60'
              }`}
            >
              MESSAGE
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows='4'
              className='w-full bg-transparent border-b-2 border-[#c8c8c8]/20 focus:border-[#00f050] outline-none py-3 text-white text-lg md:text-xl transition-all duration-300 resize-none'
              required
            />
          </div>

          <div className='form-group'>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`group relative bg-[#00f050] text-black font-[font1] text-lg md:text-xl py-3 px-8 md:px-12 overflow-hidden transition-all duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className='relative z-10'>
                {isSubmitting ? 'SENDING...' : submitStatus === 'success' ? '✓ SENT!' : 'SEND MESSAGE'}
              </span>
              <div className='absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
            </button>
            {submitStatus === 'success' && (
              <p className='text-[#00f050] text-sm md:text-base mt-3 animate-pulse'>
                Message sent successfully! I'll get back to you soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className='text-red-500 text-sm md:text-base mt-3'>
                Failed to send message. Please try again or email me directly.
              </p>
            )}
          </div>
        </form>


        <div className=' pt-12'>
          <h2 className='social-links text-2xl md:text-3xl font-[font1] text-white mb-6'>
            CONNECT WITH ME
          </h2>
          <div className='flex flex-wrap gap-6'>
            <a
              href='https://github.com/ikeshav26'
              target='_blank'
              rel='noopener noreferrer'
              className='social-links group text-[#c8c8c8]/60 hover:text-[#00f050] transition-colors duration-300 text-base md:text-lg'
            >
              <span className='relative'>
                GITHUB
                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#00f050] group-hover:w-full transition-all duration-300'></span>
              </span>
            </a>
            <a
              href='https://linkedin.com/in/keshavgilhotra'
              target='_blank'
              rel='noopener noreferrer'
              className='social-links group text-[#c8c8c8]/60 hover:text-[#00f050] transition-colors duration-300 text-base md:text-lg'
            >
              <span className='relative'>
                LINKEDIN
                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#00f050] group-hover:w-full transition-all duration-300'></span>
              </span>
            </a>
            <a
              href='mailto:keshavgilhotra@example.com'
              className='social-links group text-[#c8c8c8]/60 hover:text-[#00f050] transition-colors duration-300 text-base md:text-lg'
            >
              <span className='relative'>
                EMAIL
                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#00f050] group-hover:w-full transition-all duration-300'></span>
              </span>
            </a>
            <a
              href='https://twitter.com/keshavgilhotra'
              target='_blank'
              rel='noopener noreferrer'
              className='social-links group text-[#c8c8c8]/60 hover:text-[#00f050] transition-colors duration-300 text-base md:text-lg'
            >
              <span className='relative'>
                TWITTER
                <span className='absolute bottom-0 left-0 w-0 h-[2px] bg-[#00f050] group-hover:w-full transition-all duration-300'></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact