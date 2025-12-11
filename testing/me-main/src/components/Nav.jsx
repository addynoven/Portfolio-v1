import { useGSAP } from "@gsap/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Nav = () => {
  const [dropdown, setdropdown] = useState(false);
  
  const navItems = [
    { name: "Homes", path: "/#home" ,color:"#EAB308"},
    { name: "About", path: "/#about" ,color:"#3B82F6"},
    { name: "Projects", path: "/#projects" ,color:"#14bA86"},
    { name: "Contact", path: "/#contact",color:"#6366f1" },
  ];

  const socialLinks=[
    {name:"Github",path:"https://github.com/ikeshav26"},
    {name:"LinkedIn",path:"https://www/linkedin.com/in/keshav-gilhotra"},
    {name:"Twitter",path:"https://twitter.com/keshavgilh95"},
    {name:"Instagram",path:"https://www.instagram.com/keshav_gilhotra_"},
  ]



  return (
    <div>
      <button
        onClick={() => setdropdown(!dropdown)}
        aria-label={dropdown ? "Close menu" : "Open menu"}
        aria-expanded={dropdown}
        aria-controls="navigation-menu"
        className={`z-50 cursor-pointer fixed top-10 right-10 flex flex-col justify-center items-center transition-all duration-300 ${
          dropdown ? "gap-0" : "gap-2"
        }`}
      >
        <span
          className={`h-[3px] w-8 bg-[#c8c8c8] transition-all duration-300 ${
            dropdown ? "rotate-45 translate-y-[1.5px]" : ""
          }`}
        ></span>
        <span
          className={`h-[3px] w-8 bg-[#c8c8c8] transition-all duration-300 ${
            dropdown ? "-rotate-45 -translate-y-[1.5px]" : ""
          }`}
        ></span>
      </button>

     
      <div
        id="navigation-menu"
        role="navigation"
        aria-label="Main navigation"
        className={`dropdown fixed top-0 right-0 w-full sm:w-1/3 flex h-screen bg-[#1a1a1a] z-40 transition-transform duration-500 ease-in-out ${
          dropdown ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full w-1/2 gap-8 ">
        <h1 className="font-[font2] text-2xl text-[#c8c8c8]/60 mb-6">SOCIAL</h1>
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit my ${item.name} profile`}
              className="text-xl font-[font2]  text-[#c8c8c8] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <nav className="flex flex-col items-center justify-center h-full w-1/2 gap-8 ">
        <h1 className="font-[font2] text-2xl text-[#c8c8c8]/60 mb-6">MENU</h1>
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-xl font-[font2] flex  items-center gap-2  text-[#c8c8c8] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>{item.name}
            </Link>
          ))}
        </nav>

        <div className={`fixed bottom-15 left-1/6 font-[font2] flex flex-col gap-4 text-xl z-50 transition-opacity duration-500 ${
        dropdown ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <div className="text-[#c8c8c8]/60">GET IN TOUCH</div>
        <div className="text-[#c8c8c8]">keshavgilhotra4@gmail.com</div>
      </div>
      </div>


      <div className='fixed -left-21 md:-left-20 top-3/4 font-[font2] text-[#c8c8c8]/50 rotate-90 text-sm md:text-lg'>keshavgilhotra4@gmail.com</div>

    </div>
  );
};

export default Nav;
