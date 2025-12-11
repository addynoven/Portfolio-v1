import React, { useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import { FiExternalLink } from "react-icons/fi";


const Project = ({ number, title, tech, description, link,image,status }) => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current || !imageRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const relativeX = x / rect.width
    const relativeY = y / rect.height
    

    const offsetX = (relativeX - 0.5) * 40
    const offsetY = (relativeY - 0.5) * 40
    
    setMousePos({ x: offsetX, y: offsetY })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div className='w-full px-6 md:px-12 lg:px-20 py-4 sm:py-4'>
      <style>{`
        .title-gradient {
          background: linear-gradient(to right, #00f050 0%, #00f050 50%, #c8c8c8 50%, #c8c8c8 100%);
          background-size: 200% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: background-position 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .group:hover .title-gradient {
          background-position: 0% 0;
        }
        
        .link-icon {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          transition: stroke-dashoffset 1s ease-in-out, opacity 0.3s ease;
        }
        
        .group:hover .link-icon {
          stroke-dashoffset: 0;
          opacity: 1;
        }

        .project-image {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.6s ease-out, transform 0.3s ease-out;
          pointer-events: none;
        }

        @media (min-width: 768px) {
          .group:hover .project-image {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
      
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='w-full border-b border-[#c8c8c8]/30 pb-4 sm:pb-6 group relative'
      >
        <div className='flex flex-col sm:flex-row items-start gap-3 sm:gap-3 md:gap-5'>

          <div className='text-[#c8c8c8]/60 font-[font1] text-xl sm:text-2xl md:text-3xl min-w-[60px] sm:min-w-20'>
            _{number}.
          </div>
          
          <div className='flex-1 flex flex-col gap-3 sm:gap-4'>
            <Link to={link} className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[font1] flex items-center gap-4 sm:gap-6 md:gap-8'>
              <h3 className='title-gradient'>{title}</h3>
              <span className='text-lg text-[#00f050]'>{status ? ` (${status})` : ""}</span>
              <FiExternalLink className='link-icon w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 opacity-0 shrink-0'/>
            </Link>
            
            
            <div className='text-sm sm:text-base md:text-sm font-[font2] text-[#c8c8c8]/60 uppercase tracking-wider'>
              {tech}
            </div>
            
            {description && (
              <p className='text-sm sm:text-base md:text-lg font-[font2] text-[#c8c8c8]/70 max-w-xl leading-relaxed'>
                {description}
              </p>
            )}
        
          </div>
          
        </div>

        <div 
          ref={imageRef}
          style={{ 
            backgroundImage: `url(${image})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            transform: isHovering 
              ? `translate(${mousePos.x}px, ${mousePos.y}px) scale(1)` 
              : 'translate(0, 0) scale(0.95)',
          }} 
          className='project-image absolute top-0 right-20 w-90 h-50 rounded-lg shadow-xl '
        ></div>
      </div>
    </div>
  )
}

export default Project