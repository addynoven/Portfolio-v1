import React from 'react'
import GitHubCalendar from 'react-github-calendar';
import { GiTwirlyFlower } from "react-icons/gi";
import { gsap } from 'gsap';
import {useGSAP} from '@gsap/react'
import Heading from './Heading.jsx';


const Git = () => {
  const username = "ikeshav26";
  
  
  const customTheme = {
    light: [
      '#161b22',  
      '#0e4429',  
      '#006d32',  
      '#26a641',  
      '#39d353',  
    ],
    dark: [
      '#2c2c2c',  
      '#003d1a',  
      '#00662b',
      '#00a847',  
      '#00f050',  
    ],
  };

  useGSAP(()=>{
    gsap.to('.icon',{
      rotate:360,
      duration:4,
      repeat:-1,
      ease:"linear",
    })
  })

  return (
    <div className='w-full py-12 sm:py-16 flex flex-col items-center justify-center px-6'>
      
      <div className='w-full max-w-7xl flex flex-col items-center'>
        <div className='w-full overflow-x-auto flex justify-center px-2'>
          <div className='inline-block min-w-fit'>
            <GitHubCalendar 
              username={username}
              theme={customTheme}
              colorScheme="dark"
              blockSize={window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 10 : 12}
              blockMargin={window.innerWidth < 640 ? 3 : 4}
              fontSize={window.innerWidth < 640 ? 12 : 14}
              style={{
                color: '#c8c8c8',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Git