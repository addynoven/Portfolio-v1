import React from 'react'

const Card = ({ children, onClick, className = '', clickable = false }) => (
  <div 
    className={`
      bg-gradient-to-br from-[#1a1a1a]/90 to-[#141414]/80 backdrop-blur-sm
      rounded-xl p-4 border border-[#2a2a2a] 
      min-h-[80px] flex items-center gap-4
      transition-all duration-300
      ${clickable ? 'cursor-pointer hover:border-[#4ade80]/40 hover:from-[#1f1f1f]/90 hover:to-[#181818]/80 group' : ''}
      ${className}
    `}
    onClick={onClick}
  >
    {children}
    {clickable && (
      <span className="text-[#4ade80]/40 group-hover:text-[#4ade80] group-hover:translate-x-1 transition-all duration-200 text-sm ml-auto">
        →
      </span>
    )}
  </div>
)

export default Card