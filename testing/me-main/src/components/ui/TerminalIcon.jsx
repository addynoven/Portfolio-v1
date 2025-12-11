import React from 'react'

const TerminalIcon = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="fixed bottom-10 right-10 z-50 w-12 h-12 bg-[#c8c8c8] rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-[#333] flex lg:hidden items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 group hover:border-[#4ade80]/50 hover:shadow-[0_0_25px_rgba(74,222,128,0.2)]"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-[#2a2a2a]"
      >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    </div>
  )
}

export default TerminalIcon