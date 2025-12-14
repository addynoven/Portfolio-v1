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
            fieldValue: "Neon Stain",
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
        category: "Full Stack",
        title: "NeonFlix",
        description:
            "A modern Netflix-inspired streaming platform with user authentication, TV shows, movies, and personalized recommendations. Features a sleek dark UI with smooth animations.",
        href: "",
        image: "/assets/work/neonflix.png",
        Stack: [
            { name: "Next.js" },
            { name: "React" },
            { name: "Tailwind CSS" },
            { name: "MongoDB" },
            { name: "Auth.js" },
        ],
        live: "https://neonflix.abstergo.me/",
        github: "https://github.com/addynoven",
    },
    {
        num: "02",
        category: "AI/ML",
        title: "Dog Lab",
        description:
            "AI-powered dog breed identification using a fine-tuned ConvNeXt model with 99% accuracy across 120+ breeds. Features quiz games, emergency vet locator, and breed origin mapping.",
        href: "",
        image: "/assets/work/doglab.png",
        Stack: [
            { name: "Next.js" },
            { name: "Python" },
            { name: "TensorFlow" },
            { name: "ConvNeXt" },
            { name: "Tailwind CSS" },
        ],
        live: "https://doglab.abstergo.me/",
        github: "https://github.com/addynoven",
    },
    {
        num: "03",
        category: "Full Stack",
        title: "SecureShare",
        description:
            "End-to-end encrypted file sharing platform with automatic expiration, password protection, and drag-n-drop uploads. Privacy-first design with no permanent storage.",
        href: "",
        image: "/assets/work/secureshare.png",
        Stack: [
            { name: "Next.js" },
            { name: "Node.js" },
            { name: "Encryption" },
            { name: "AWS S3" },
            { name: "Tailwind CSS" },
        ],
        live: "https://secureshare.abstergo.me/",
        github: "https://github.com/addynoven",
    },
    {
        num: "04",
        category: "NPM Package",
        title: "ReactBits Installer",
        description:
            "CLI tool for installing beautiful, animated React components from the ReactBits library. Supports selective component installation with automatic dependency resolution.",
        href: "",
        image: "/assets/work/reactbits.png",
        Stack: [
            { name: "Node.js" },
            { name: "CLI" },
            { name: "NPM" },
            { name: "JavaScript" },
        ],
        live: "https://www.npmjs.com/package/reactbits-installer",
        github: "https://github.com/addynoven",
    },
    {
        num: "05",
        category: "Python Package",
        title: "NeetCode RPG",
        description:
            "A gamified coding practice CLI tool published on PyPI. Turns LeetCode-style problem solving into an RPG adventure with XP, levels, and achievements.",
        href: "",
        image: "/assets/work/neetcode.png",
        Stack: [
            { name: "Python" },
            { name: "PyPI" },
            { name: "CLI" },
            { name: "Rich" },
        ],
        live: "https://pypi.org/project/neetcode-rpg/",
        github: "https://github.com/addynoven",
    },
    {
        num: "06",
        category: "Mobile",
        title: "Devotional App",
        description:
            "A beautiful Flutter/Dart mobile application for daily devotionals, spiritual content, and meditation. Features offline support and push notifications.",
        href: "",
        image: "/assets/work/devotional.png",
        Stack: [
            { name: "Flutter" },
            { name: "Dart" },
            { name: "Firebase" },
            { name: "Provider" },
        ],
        live: "https://github.com/addynoven/devotional_app",
        github: "https://github.com/addynoven/devotional_app",
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
        value: "+91 626 199 5234",
    },
    {
        title: "Email",
        icon: <FaEnvelope />,
        description: <a href="mailto:dmcbaditya@gmail.com">dmcbaditya@gmail.com</a>,
        value: "dmcbaditya@gmail.com",
    },
    {
        title: "Address",
        icon: <FaMapMarkerAlt />,
        description: "Bhopal, MP, India",
        value: "Bhopal, MP, India",
    },
];
