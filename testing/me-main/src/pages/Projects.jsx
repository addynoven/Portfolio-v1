import React from 'react'
import { lazy } from 'react'
const Heading = lazy(() => import('../components/ui/Heading'));
const Project = lazy(() => import('../components/Project'));
import { projectsData } from '../assets/assets';



const Projects = () => {
  

  return (
    <div className='min-h-screen w-full py-12 sm:py-16 md:py-20'>
      <Heading text={"MY PROJECTS"}/>
      
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-2  mt-8 sm:mt-12'>
        {projectsData.map((project, index) => (
          <Project
            key={index}
            number={project.number}
            title={project.title}
            tech={project.tech}
            description={project.description}
            link={project.link}
            image={project.image}
            status={project.status}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects
