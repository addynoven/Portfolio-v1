import { SiOpenai, SiPostman, SiNginx, SiGithubactions, SiAmazonwebservices, SiDigitalocean } from "react-icons/si";
import { FaJava } from "react-icons/fa";

export const frontend = [
    { name: "JavaScript", logo: "/logos/js.png" },
    { name: "TypeScript", logo: "/logos/ts.png" },
    { name: "React", logo: "/logos/react.png" },
    { name: "Next.Js", logo: "/logos/next.png" },
    { name: "Expo", logo: "/logos/expo.png" },
    { name: "React Native", logo: "/logos/react.png" },
    { name: "Tailwind CSS", logo: "/logos/tailwind.png" },
    { name: "GSAP", logo: "/logos/gsap.png" },
    { name: "Framer Motion", logo: "/logos/framer-motion.png" },
    { name: "SASS", logo: "/logos/sass.png" },
    { name: "Bootstrap", logo: "/logos/bootstrap.svg" },
];

export const backend = [
    { name: "Node.Js", logo: "/logos/node.png" },
    { name: "Express", logo: "/logos/express.png" },
    { name: "Java", icon: FaJava, iconColor: "#ff6c37" },
    { name: "OpenAI", icon: SiOpenai, iconColor: "#10A37F" },
    { name: "Oauth", logo: "/logos/oauth.png" },
    { name: "Redis", logo: "/logos/redis.png" },
];

export const database = [
    { name: "MongoDB", logo: "/logos/mongodb.png" },
    { name: "MySQL", logo: "/logos/mysql.svg" },
];

export const tools = [
    { name: "Git", logo: "/logos/git.png" },
    { name: "GitHub", logo: "/logos/github.png" },
    { name: "Docker", logo: "/logos/docker.svg" },
    { name: "Postman", icon: SiPostman, iconColor: "#FF6C37" },
    { name: "CI/CD", icon: SiGithubactions, iconColor: "#2088FF" },
    { name: "AWS", icon: SiAmazonwebservices, iconColor: "#FF9900" },
    { name: "DigitalOcean", icon: SiDigitalocean, iconColor: "#0080FF" },
    { name: "NginX", icon: SiNginx, iconColor: "#009639" }
];

export const projectsData = [
    {
        number: "01",
        title: "SECUREAUTH",
        tech: "NEXT.JS • EXPRESS • REDIS • DOCKER • CI/CD • AI SECURITY",
        description:
            "Enterprise-grade security platform offering Git repo scanning, Zero-Trust secrets vault, AI security assistant, log monitoring, and a full developer security dashboard.",
        link: "https://github.com/MannuVilasara/hacknauts-sentinels",
        image: "/projects/secureauth.jpg",
        status: "In Progress"
    },
    {
        number: "02",
        title: "CLASS OCCUPANCY & FAN DETECTION",
        tech: "YOLO • REACT NATIVE • OPENCV • PYTHON",
        description:
            "Real-time classroom monitoring system using YOLO for people count detection and OpenCV for fan status recognition.",
        link: "https://github.com/ikeshav26/auto_detection_",
        image: "/projects/class-monitor.png"
    },
    {
        number: "03",
        title: "ZETTANOTE",
        tech: "NODE.JS • VITE • REDIS • OAUTH • DOCKER • OPEN SOURCE",
        description:
            "Open-source collaborative note-taking platform with real-time sync, Redis caching, and OAuth authentication.",
        link: "https://zettanote.tech/",
        image: "/projects/zettanote.png"
    },
    {
        number: "04",
        title: "AUTO PR REVIEWER",
        tech: "GITHUB ACTIONS • NODE.JS • GEMINI API",
        description:
            "AI-powered GitHub automation that reviews pull requests, detects issues, and suggests improvements via GitHub Actions.",
        link: "https://github.com/ikeshav26/auto_pr_reviewer",
        image: "/projects/reviewer.png"
    },
    {
        number: "05",
        title: "ECHOVIA - MUSIC PLAYER",
        tech: "MONGODB • EXPRESS.JS • REACT.JS • NODE.JS",
        description:
            "Full-stack music streaming platform with real-time playback, custom playlists, and user authentication.",
        link: "https://echovia-music-player.vercel.app/",
        image: "/projects/echovia.png"
    },
    {
        number: "06",
        title: "FIT AI - HEALTH PREDICTOR",
        tech: "PYTHON • FLASK • STREAMLIT • MACHINE LEARNING • SCIKIT-LEARN",
        description:
            "ML-based health diagnosis system that predicts diseases from symptoms and provides explanations and treatment recommendations.",
        link: "https://github.com/ikeshav26/disease-detector",
        image: "/projects/fit.png"
    },
];
