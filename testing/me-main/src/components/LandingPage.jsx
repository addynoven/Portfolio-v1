import React from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

const LandingPage = ({children}) => {
    useGSAP(()=>{
      const tl=gsap.timeline()
      const tl2=gsap.timeline()

      tl.from('.name',{
          opacity:0,
          y:100,
          stagger:0.05,
          duration: 0.5,
          ease: 'power2.out'
      })

        tl2.to('.stair',{
            yPercent:100,
            stagger:0.05,
            duration: 0.4,
            delay:0.8
        })

        tl.to('.name',{
           opacity:0,
           y:-50,
           stagger:0.05,
           duration: 0.3,
           delay:0.4
        })
        
        tl2.to('.main',{
           opacity: 0,
           duration: 0.2,
           display: 'none'
        })
    })
  return (
    <>
    <div className='main fixed inset-0 z-50 flex overflow-hidden'>
      <div className='group z-60 font-[font1] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[17vw]  text-white'>
      <span className='name'>K</span>
      <span className='name'>E</span>
      <span className='name'>S</span>
      <span className='name'>H</span>
      <span className='name'>A</span>
      <span className='name'>V</span>
      </div>
      <div className='stair h-screen w-[20vw] md:w-[10vw] bg-black'></div>
      <div className='stair h-screen w-[10vw] hidden md:block bg-black'></div>
      <div className='stair h-screen w-[20vw] md:w-[10vw] bg-black'></div>
      <div className='stair h-screen w-[10vw] hidden md:block bg-black'></div>
      <div className='stair h-screen w-[20vw] md:w-[10vw] bg-black'></div>
      <div className='stair h-screen w-[10vw] hidden md:block bg-black'></div>
      <div className='stair h-screen w-[20vw] md:w-[10w] bg-black'></div>
      <div className='stair h-screen w-[10vw] hidden md:block bg-black'></div>
      <div className='stair h-screen w-[20vw] md:w-[10vw] bg-black'></div>
      <div className='stair h-screen w-[10vw]  hidden md:block bg-black'></div>
    </div>
    <div>
        {children}
    </div>
    </>
  )
}

export default LandingPage
