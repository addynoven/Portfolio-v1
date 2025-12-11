import React from 'react'

const Skill = ({name, logo, icon: Icon, iconColor}) => {
  return (
    <div className='flex items-center gap-2 sm:gap-3 bg-[#2c2c2c]/40 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg' role="listitem">
      {Icon ? (
        <Icon className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' style={{ color: iconColor || '#00f050' }} aria-hidden="true" />
      ) : (
        <img src={logo} className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' alt={`${name} logo`} loading="lazy" width="32" height="32"/>
      )}
      <span className='text-[#c8c8c8] font-[font2] text-sm sm:text-base md:text-lg lg:text-xl'>{name}</span>
    </div>
  )
}

export default Skill