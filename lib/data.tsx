import {
    FaHtml5,
    FaJs,
    FaReact,
    FaFigma,
    FaNode,
    FaCss3Alt,
    FaJava,
    FaGithub,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

import {
    SiTailwindcss,
    SiNextdotjs,
    SiPython,
    SiC,
    SiCplusplus,
    SiExpress,
    SiMongodb,
} from "react-icons/si";

import {
    AboutData,
    ExperienceData,
    EducationData,
    SkillsData,
    ProjectItem,
    ServiceItem,
    ContactInfoItem,
} from "@/types";

// about me data
export const About: AboutData = {
    title: "About Me",
    description:
        "I'm a MERN stack developer with a background in AI & Data Analytics, focused on building responsive, dynamic, and user-centric web solutions.",
    info: [
        {
            fieldName: "Name",
            fieldValue: "Aditya Sahu",
        },
        {
            fieldName: "Phone",
            fieldValue: "+91 626 199 5234",
        },
        { fieldName: "Experience", fieldValue: "1 year" },
        { fieldName: "Discord", fieldValue: "neon8052" },
        { fieldName: "Nationality", fieldValue: "Indian" },
        { fieldName: "Email", fieldValue: "dmcbaditya@gmail.com" },
        { fieldName: "Freelance", fieldValue: "Available" },
        { fieldName: "Languages", fieldValue: "English, Hindi" },
        { fieldName: "Address", fieldValue: "Bhopal, India" },
    ],
};

// experience data
export const Experience: ExperienceData = {
    icon: "/assets/resume/badge.svg",
    title: "My experience",
    description: `
    I've developed user-friendly web applications as a Full Stack Developer, collaborating with teams to deliver responsive solutions that enhance functionality and user experience. 
    `,
    items: [
        {
            company: "RI BEAUTY (Startup)",
            position: "Full Stack Developer",
            duration: "Jun 2024 - Present",
        },
        {
            company: "Orcus (Startup)",
            position: "Full Stack Developer",
            duration: "Dec 2023 - May 2024",
        },
    ],
};

// education data
export const Education: EducationData = {
    icon: "/assets/Resume/cap.svg",
    title: "My Education",
    description: "My educational journey and certifications:",
    items: [
        {
            institution: "Oriental Group of Institutes",
            degree: "Master of Computer Applications",
            duration: "Sep 2024 - Present",
        },
        {
            institution: "Sheryians Coding School",
            degree: "Back-End Domination",
            duration: "Aug 2024 - Present",
        },
        {
            institution: "Sheryians Coding School",
            degree: "Advanced DSA with Java",
            duration: "Apr 2024 - Present",
        },
        {
            institution: "LNCT Group of Colleges",
            degree: "BCA, AI & Data Analytics",
            duration: "Oct 2021 - May 2024",
        },
        {
            institution: "Sheryians Coding School",
            degree: "Front-End Domination",
            duration: "Jan 2024 - Jul 2024",
        },
        {
            institution: "Sheryians Coding School",
            degree: "MERN Stack Developer",
            duration: "Jul 2023 - Jan 2024",
        },
        {
            institution: "Sharma Computer Academy",
            degree: "Java and Spring Boot",
            duration: "Jun 2022 - Jun 2023",
        },
        {
            institution: "Sharma Computer Academy",
            degree: "DSA with C++",
            duration: "Jan 2022 - Jun 2022",
        },
        {
            institution: "ITE Infotech Pvt Ltd",
            degree: "RHCSA Certification",
            duration: "Feb 2020 - Jun 2020",
        },
    ],
};

// skills data
export const Skills: SkillsData = {
    title: "My skills",
    description:
        "I specialize in full-stack development, delivering dynamic web solutions using modern technologies and frameworks.",
    skillList: [
        { name: "Java", icon: <FaJava /> },
        { name: "Python", icon: <SiPython /> },
        { name: "C++", icon: <SiCplusplus /> },
        { name: "C", icon: <SiC /> },
        { name: "Express.js", icon: <SiExpress /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "HTML", icon: <FaHtml5 /> },
        { name: "CSS", icon: <FaCss3Alt /> },
        { name: "JavaScript", icon: <FaJs /> },
        { name: "React", icon: <FaReact /> },
        { name: "Figma", icon: <FaFigma /> },
        { name: "Node.js", icon: <FaNode /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
        { name: "GitHub", icon: <FaGithub /> },
    ],
};

// projects data
export const projects: ProjectItem[] = [
    {
        num: "01",
        category: "Frontend",
        title: "Website Development",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
        href: "",
        image: "/assets/work/thumb1.png",
        Stack: [
            { name: "HTML 5" },
            { name: "CSS 3" },
            { name: "JavaScript" },
            { name: "React" },
        ],
        live: "https://github.com/Addynoven",
        github: "https://github.com/Addynoven",
    },
    {
        num: "02",
        category: "UI/UX",
        title: "UI/UX Design",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
        href: "",
        image: "/assets/work/thumb2.png",
        Stack: [
            { name: "React" },
            { name: "Figma" },
            { name: "Next.js" },
            { name: "Tailwind CSS" },
        ],
        live: "https://github.com/addynoven",
        github: "https://github.com/addynoven",
    },
    {
        num: "03",
        category: "Game",
        title: "Game Development",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, quo!",
        href: "",
        image: "/assets/work/thumb3.png",
        Stack: [
            { name: "HTML 5" },
            { name: "CSS 3" },
            { name: "JavaScript" },
            { name: "React" },
        ],
        live: "https://github.com/addynoven",
        github: "https://github.com/addynoven",
    },
    {
        num: "04",
        category: "3D Web",
        title: "Immersive 3D Experience",
        description:
            "A high-performance 3D web experience using WebGL and advanced post-processing effects. Features an infinite hyperspeed tunnel with dynamic lighting.",
        href: "",
        image: "/assets/work/thumb1.png",
        Stack: [
            { name: "Three.js" },
            { name: "React Three Fiber" },
            { name: "GLSL" },
            { name: "Next.js" },
        ],
        live: "https://github.com/addynoven",
        github: "https://github.com/addynoven",
    },
    {
        num: "05",
        category: "Interactive",
        title: "Distorted Reality",
        description:
            "An interactive grid distortion effect that reacts to mouse movement. Creates a liquid-like organic feel using custom shaders and kinetic physics.",
        href: "",
        image: "/assets/work/thumb2.png",
        Stack: [
            { name: "WebGL" },
            { name: "React" },
            { name: "Shaders" },
            { name: "GSAP" },
        ],
        live: "https://github.com/addynoven",
        github: "https://github.com/addynoven",
    },
];

// services data
export const servicesData: ServiceItem[] = [
    {
        num: "01",
        title: " Portfolio & Personal Branding Sites",
        Description:
            "Showcase your skills in creating visually appealing and highly functional personal sites. Emphasize how you can build custom, branded portfolio websites that highlight personal or business branding, provide strong online presence, and enable dynamic content updates.",
        href: "#work",
    },
    {
        num: "02",
        title: "E-Commerce Solutions",
        Description:
            "Tailor this to include full-stack e-commerce websites with shopping carts, secure payment integrations, and product management. Describe your ability to create seamless, scalable e-commerce solutions that cater to small businesses and larger brands alike.",
        href: "#work",
    },
    {
        num: "03",
        title: " Business Applications",
        Description:
            "For companies looking to digitize their operations, you can provide custom business applications. This could cover CRMs, project management systems, or data-driven platforms, where your AI and analytics background can set you apart for data-intensive needs.",
        href: "#work",
    },
    {
        num: "04",
        title: "AI-Powered Solutions",
        Description:
            "Exploring AI and Machine Learning to add smart, data-driven features to applications. I bring the power of AI and analytics to your web applications, enabling predictive insights and personalized user experiences.",
        href: "#work",
    },
    {
        num: "05",
        title: "Data Analytics & Visualization",
        Description:
            "Leveraging data to gain insights and drive informed decisions. With a background in Artificial Intelligence & Data Analytics, I can analyze and visualize data to help clients understand trends, improve strategies, and make data-driven decisions.",
        href: "#work",
    },
    {
        num: "06",
        title: "Frontend Development",
        Description:
            "Crafting engaging and intuitive interfaces that elevate user experiences. Specializing in React and Next.js, I focus on seamless, dynamic, and accessible frontend solutions with optimized performance and engaging animations. ",
        href: "#work",
    },
];

// contact info
export const contactInfo: ContactInfoItem[] = [
    {
        title: "Phone",
        icon: <FaPhoneAlt />,
        description: <a href="tel:+91 626 199 5234">+91 626 199 5234</a>,
    },
    {
        title: "Email",
        icon: <FaEnvelope />,
        description: <a href="mailto:dmcbaditya@gmail.com">dmcbaditya@gmail.com</a>,
    },
    {
        title: "Address",
        icon: <FaMapMarkerAlt />,
        description:
            "House No. 7, Narmada Kunj, Shaheed Nagar Colony, Bhopal, MP, India",
    },
];
