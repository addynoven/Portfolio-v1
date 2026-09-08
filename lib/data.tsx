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
    title: "Work Experience",
    description: "Production software engineering and startup contributions building reliable, user-centric web applications and scalable backends.",
    items: [
        {
            company: "RI BEAUTY",
            position: "Full Stack Developer",
            duration: "Jun 2024 - Present",
            location: "Remote / Bhopal, India",
            description: "Lead full-stack engineering for production e-commerce platform and client-facing digital experiences.",
            bullets: [
                "Architected a modern e-commerce web application with Next.js 16, React 19, TypeScript, and Tailwind CSS.",
                "Engineered Razorpay payment gateway integration with robust webhook verification, cryptographic signature validation, and email alerts.",
                "Optimized Core Web Vitals to sub-second LCP by implementing dynamic component streaming and responsive image optimization.",
                "Built cart state management, persistent wishlist, and real-time product search with defensive boundary validation."
            ],
            skills: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Razorpay", "Node.js", "REST APIs"]
        },
        {
            company: "Orcus",
            position: "Full Stack Developer",
            duration: "Dec 2023 - May 2024",
            location: "Bhopal, India",
            description: "Developed responsive frontend features and scalable backend REST APIs within an agile startup environment.",
            bullets: [
                "Constructed reusable, accessible UI component modules adhering to modern accessibility guidelines.",
                "Designed and implemented RESTful endpoints with Node.js and Express, incorporating JWT authentication and rate limiting.",
                "Structured MongoDB schemas with indexing strategies to minimize database query latency on high-traffic routes.",
                "Collaborated closely in cross-functional agile sprints, conducting code reviews and optimizing release delivery."
            ],
            skills: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"]
        },
    ],
};

// education data
export const Education: EducationData = {
    icon: "/assets/Resume/cap.svg",
    title: "Education & Certifications",
    description: "Formal computer science education and professional industry certifications:",
    items: [
        {
            institution: "Oriental Group of Institutes",
            degree: "Master of Computer Applications (MCA)",
            duration: "Sep 2024 - Present",
        },
        {
            institution: "LNCT Group of Colleges",
            degree: "BCA, Artificial Intelligence & Data Analytics",
            duration: "Oct 2021 - May 2024",
        },
        {
            institution: "Red Hat (ITE Infotech)",
            degree: "RHCSA (Red Hat Certified System Administrator)",
            duration: "Feb 2020 - Jun 2020",
        },
        {
            institution: "Sheryians Coding School",
            degree: "Back-End Domination (Node.js, Express, Databases)",
            duration: "Aug 2024 - Present",
        },
        {
            institution: "Sheryians Coding School",
            degree: "Front-End Domination & MERN Stack Development",
            duration: "Jul 2023 - Jul 2024",
        },
        {
            institution: "Sharma Computer Academy",
            degree: "Advanced DSA & Systems with C++ and Java",
            duration: "Jan 2022 - Jun 2023",
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
        title: "RI Store",
        description:
            "Production jewelry e-commerce platform featuring Razorpay checkout, wishlist, and multi-step order workflows. Built on Next.js 16 and React 19 with 95+ Core Web Vitals score.",
        href: "",
        image: "/assets/work/ristore.png",
        Stack: [
            { name: "Next.js 16" },
            { name: "React 19" },
            { name: "TypeScript" },
            { name: "Tailwind CSS" },
            { name: "Razorpay" },
            { name: "NextAuth.js" },
        ],
        live: "https://ristore.abstergo.me/",
        github: "https://github.com/addynoven/RI_store",
    },
    {
        num: "02",
        category: "Full Stack",
        title: "NeonFlix",
        description:
            "Full-featured streaming web app with JWT authentication, real-time title search, personalized watchlists, and dynamic video playback interfaces with sleek cyberpunk theme.",
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
        github: "https://github.com/addynoven/NeonTv",
    },
    {
        num: "03",
        category: "AI/ML",
        title: "Dog Lab",
        description:
            "AI-powered canine classification system achieving 99% accuracy across 120+ breeds using a fine-tuned ConvNeXt model. Includes real-time image inference, vet locator, and breed quiz.",
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
        github: "https://github.com/addynoven/dog_breed_identifier_frontend",
    },
    {
        num: "04",
        category: "Full Stack",
        title: "SecureShare",
        description:
            "Privacy-first zero-knowledge encrypted file sharing with auto-expiration, password-protected downloads, and streaming uploads with zero permanent retention.",
        href: "",
        image: "/assets/work/secureshare.png",
        Stack: [
            { name: "Next.js" },
            { name: "Node.js" },
            { name: "Web Crypto" },
            { name: "AWS S3" },
            { name: "Tailwind CSS" },
        ],
        live: "https://secureshare.abstergo.me/",
        github: "https://github.com/addynoven/dammmage-backend",
    },
    {
        num: "05",
        category: "CLI & Tools",
        title: "ReactBits Installer",
        description:
            "Open-source CLI tool published on NPM for selectively installing animated React UI components with automated dependency resolution and Tailwind setup.",
        href: "",
        image: "/assets/work/reactbits.png",
        Stack: [
            { name: "Node.js" },
            { name: "CLI" },
            { name: "NPM Package" },
            { name: "JavaScript" },
        ],
        live: "https://www.npmjs.com/package/reactbits-installer",
        github: "https://github.com/addynoven/react-bits",
    },
    {
        num: "06",
        category: "CLI & Tools",
        title: "NeetCode RPG",
        description:
            "Gamified coding adventure CLI published on PyPI. Transforms algorithmic practice into an RPG progression system with terminal XP, level-ups, and streak tracking.",
        href: "",
        image: "/assets/work/neetcode.png",
        Stack: [
            { name: "Python" },
            { name: "PyPI" },
            { name: "CLI" },
            { name: "Rich" },
        ],
        live: "https://pypi.org/project/neetcode-rpg/",
        github: "https://pypi.org/project/neetcode-rpg/",
    },
    {
        num: "07",
        category: "Mobile",
        title: "Devotional App",
        description:
            "Cross-platform mobile application developed with Flutter and Firebase. Features daily spiritual readings, audio player, offline sync, and push notifications.",
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
