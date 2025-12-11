import React, { useState } from 'react'
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react'
import { lazy } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
const Activity = lazy(() => import('../components/Activity'));
const Terminal = lazy(() => import('../components/Terminal'));

const Home = ({ onekoEnabled, setOnekoEnabled }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('npx who-keshav');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(()=>{
    const tl=gsap.timeline();
    const tl2=gsap.timeline();
    
    tl.to('.svg-arrow-1',{
      duration:1,
      strokeDashoffset:0,
      strokeDasharray:400,
      repeat:-1
    })

    tl.to('.svg-arrow-2',{
      duration:1,
      strokeDashoffset:0,
      strokeDasharray:400,
      repeat:-1
    })

    tl.from('.arrow',{
      yPercent:-20,
      repeat:-1,
      opacity:0.5,
      yoyo:true,
      ease:"power1.inOut",
      duration:1,
    })

  })
  return (
    <main id="main-content" className='h-[135vh] md:h-[110vh] lg:w-screen relative px-6 md:px-0' aria-label="Home page">
      <div className='absolute top-1/6 md:top-1/5 left-6 md:left-1/6 w-[calc(100%-3rem)] md:w-1/3 h-auto md:h-90 flex flex-col justify-between gap-8'>
      <h1 className='flex flex-col text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-[font1] leading-none tracking-tighter'>
        <span className='text-[#00f050] drop-shadow-[0_0_15px_rgba(0,240,80,0.2)]'>FULL STACK</span>
        <span className='ml-4 md:ml-8 text-white/90'>DEVELOPER</span>
      </h1>

      <div className='flex flex-col gap-3'>
        <div className='text-base sm:text-lg md:text-xl text-[#c8c8c8]/80 max-w-2xl leading-relaxed'>
          Hi! I'm <span className='text-white font-medium'>Keshav Gilhotra</span>. A Full Stack Developer with experience of building scalable, high-performance web apps. Currently enhancing my skills in Java and DSA to strengthen my backend and problem-solving expertise.
        </div>
        
        <div className='group relative bg-[#1a1a1a]/80 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4 font-mono text-sm sm:text-base w-fit hover:border-[#00f050]/50 hover:shadow-[0_0_30px_-5px_rgba(0,240,80,0.15)] transition-all duration-300'>
          <div className='flex items-center gap-3'>
            <span className='text-[#00f050]'>$</span>
            <span className='text-[#c8c8c8]'>npx who-keshav</span>
            <button
              onClick={handleCopy}
              className='ml-2 p-1.5 rounded hover:bg-[#2c2c2c] transition-colors duration-200'
              aria-label='Copy command'
            >
              {copied ? (
                <FiCheck className='w-4 h-4 text-[#00f050]' />
              ) : (
                <FiCopy className='w-4 h-4 text-[#c8c8c8]/60 group-hover:text-[#c8c8c8]' />
              )}
            </button>
          </div>
          {copied && (
            <span className='absolute -top-8 right-0 text-xs text-[#00f050] bg-[#2c2c2c] border border-[#2c2c2c] px-2 py-1 rounded'>
              Copied!
            </span>
          )}
        </div>
      </div>

      <div>
        <a 
          href='/resume.pdf' 
          download='Keshav_Gilhotra_Resume.pdf'
          className='group relative inline-block bg-[#00f050] cursor-pointer text-black font-[font1] text-lg md:text-xl py-2 px-4 overflow-hidden transition-colors duration-300'
        >
          <span className='relative z-10'>Download CV</span>
          <div className='absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
        </a>
      </div>


      <section className='mt-22 md:mt-55 md:w-5xl w-full'>
        <h2 className='text-[#00f050] text-xl font-[font1] mb-4'>CURRENT ACTIVITY</h2>
        <Activity onekoEnabled={onekoEnabled} setOnekoEnabled={setOnekoEnabled} />
      </section>
      </div>

      <section className='h-auto md:h-90 w-auto md:w-50  absolute right-6 md:right-16 top-3/7 md:bottom-1/5 hidden md:flex flex-col justify-between items-end gap-6 md:gap-0' aria-label="Statistics">
      <div className='flex flex-col items-end'>
        <div className='text-[#00f050] text-2xl sm:text-3xl font-[font1]'>1+</div>
        <div className='text-[#c8c8c8]/60 text-sm sm:text-base md:text-lg font-[font2]'>Years of Learning</div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='text-[#00f050] text-2xl sm:text-3xl font-[font1]'>2+</div>
        <div className='text-[#c8c8c8]/60 text-sm sm:text-base md:text-lg font-[font2]'>Hackathons</div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='text-[#00f050] text-2xl sm:text-3xl font-[font1]'>2.5K+</div>
        <div className='text-[#c8c8c8]/60 text-sm sm:text-base md:text-lg font-[font2]'>Hours Worked</div>
        </div>
        </section>

      
      <div className='hidden lg:block absolute right-1/5 top-1/4'>
        <Terminal />
      </div>

      <div className='arrow absolute  bottom-18 left-1/2 -translate-x-1/2  ' aria-hidden="true">
         <svg
            id="banner-arrow-svg"
            width="376"
            height="111"
            viewBox="0 0 376 111"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-24 md:w-80 md:h-80 "
            role="img"
            aria-label="Decorative arrow pointing down"
        >
            <path
                className="svg-arrow svg-arrow-1"
                d="M1 1V39.9286L188 110V70.6822L1 1Z"
                stroke="#2c2c2c"
                strokeWidth="3"
                fill="none"
            />
            <path
                className="svg-arrow svg-arrow-2"
                d="M375 1V39.9286L188 110V70.6822L375 1Z"
                stroke="#2c2c2c"
                strokeWidth="3"
                fill="none"
            />
        </svg>
      </div>
        
    </main>
  )
}

export default Home
