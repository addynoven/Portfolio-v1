"use client";

import { useState } from "react";
import { FaEnvelope, FaXTwitter, FaArrowUpRightFromSquare, FaCalendar, FaCheck, FaCopy } from "react-icons/fa6";

export default function GetInTouchCard() {
  const [copied, setCopied] = useState(false);
  const email = "dmcbaditya@gmail.com";

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section 
      className="col-span-12 md:col-span-6 lg:col-span-2 rounded-2xl bg-[#080d0d]/90 border border-[#152421] p-3.5 backdrop-blur-md flex flex-col justify-between shadow-lg min-h-[220px]"
      data-purpose="contact-card"
      id="contact"
    >
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-mono tracking-wider text-[#697f7c] uppercase">
            // GET IN TOUCH
          </span>
          <FaEnvelope className="text-[#00FF87] text-xs" />
        </div>
        <h3 className="text-xs font-bold text-white leading-tight">Let&apos;s collaborate.</h3>
        <p className="text-[9px] text-[#6e827f] mt-0.5 leading-snug">
          Open for full-time, freelance or interesting side projects.
        </p>
      </div>

      {/* Quick Contact Badges */}
      <div className="flex flex-col gap-1.5 my-1.5">
        <button
          onClick={handleCopyEmail}
          className="flex items-center justify-between px-2 py-1.5 rounded bg-[#091110] border border-[#152622] text-[9px] text-[#8ca09d] hover:text-[#00FF87] hover:border-[#1e3f34] transition text-left"
          title="Click to copy email"
        >
          <div className="flex items-center gap-1.5 truncate">
            {copied ? (
              <FaCheck className="text-[8px] text-[#00FF87]" />
            ) : (
              <FaEnvelope className="text-[8px]" />
            )}
            <span className="truncate">{copied ? "Copied to clipboard!" : email}</span>
          </div>
          <FaCopy className="text-[7px] shrink-0" />
        </button>

        <a
          href="https://twitter.com/addynoven"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-2 py-1.5 rounded bg-[#091110] border border-[#152622] text-[9px] text-[#8ca09d] hover:text-[#00FF87] hover:border-[#1e3f34] transition"
        >
          <div className="flex items-center gap-1.5">
            <FaXTwitter className="text-[8px]" />
            <span>@addynoven</span>
          </div>
          <FaArrowUpRightFromSquare className="text-[7px]" />
        </a>
      </div>

      {/* Book Chat / Email CTA */}
      <a
        href={`mailto:${email}?subject=Collaboration%20Inquiry`}
        className="w-full py-1.5 rounded-lg bg-[#0c1615] border border-[#1c3830] hover:border-[#00FF87]/50 text-[#d8e6e3] hover:text-[#00FF87] text-[10px] font-medium flex items-center justify-center gap-1.5 transition"
      >
        <FaCalendar className="text-[9px]" />
        <span>Book a Chat</span>
      </a>
    </section>
  );
}
