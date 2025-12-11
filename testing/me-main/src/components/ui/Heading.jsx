import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'


const Heading = ({text}) => {
  const textRef = useRef(null)
  const lineLeftRef = useRef(null)
  const lineRightRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    // Container fade in
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )

    // Lines expand from center outward
    tl.fromTo([lineLeftRef.current, lineRightRef.current], 
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
      '-=0.2'
    )

    // Text fades in and slides up
    tl.fromTo(textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.5'
    )

    // Continuous subtle glow pulse on lines
    gsap.to([lineLeftRef.current, lineRightRef.current], {
      boxShadow: '0 0 25px rgba(0, 240, 80, 0.7)',
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    })

    // Subtle letter spacing breathing effect
    gsap.to(textRef.current, {
      letterSpacing: '0.25em',
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    })

  }, [])

  return (
    <div ref={containerRef} className='w-full py-8 sm:py-10 md:py-12 mb-6 sm:mb-8 md:mb-10'>
      <div className='flex flex-col items-center gap-5 sm:gap-6'>
        
        {/* Dual decorative lines with center dot */}
        <div className='flex items-center gap-3 sm:gap-4'>
          <div 
            ref={lineLeftRef}
            className='w-16 sm:w-20 md:w-24 h-0.5 bg-[#00f050] origin-right'
            style={{boxShadow: '0 0 10px rgba(0, 240, 80, 0.5)'}}
          ></div>
          
          <div className='w-1.5 h-1.5 bg-[#00f050] rounded-full shadow-[0_0_10px_rgba(0,240,80,0.8)]'></div>
          
          <div 
            ref={lineRightRef}
            className='w-16 sm:w-20 md:w-24 h-0.5 bg-[#00f050] origin-left'
            style={{boxShadow: '0 0 10px rgba(0, 240, 80, 0.5)'}}
          ></div>
        </div>

        {/* Heading text */}
        <h1 
          ref={textRef}
          className='font-[font1] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#00f050] uppercase text-center'
          style={{
            letterSpacing: '0.2em',
            textShadow: '0 0 30px rgba(0, 240, 80, 0.4), 0 0 60px rgba(0, 240, 80, 0.2)'
          }}
        >
          {text}
        </h1>

      </div>
    </div>
  )
}

export default Heading