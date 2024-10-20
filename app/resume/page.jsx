"use client";

import {
    FaHtml5,
    FaCss3,
    FaJs,
    FaReact,
    FaFigma,
    FaNodeJs,
} from "react-icons/fa";

import { SiTailwindcss, SiNextdotjs } from "react-icons/si";

// about me data

const About = {
    title: "About Me",
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut culpa sequi esse, odio ab tempora?",
    info: [
        {
            fieldName: "Name",
            fieldValue: "Luke Coleman",
        },
        {
            fieldName: "Phone",
            fieldValue: "123-456-7890",
        },
        { fieldName: "Experience", fieldValue: "12+ years" },
        { fieldName: "Skype", fieldValue: "lukecoleman" },
        { fieldName: "Nationality", fieldValue: "American" },
        { fieldName: "Email", fieldValue: "lukecoleman@gmail.com" },
        { fieldName: "Freelance", fieldValue: "Available" },
        { fieldName: "Languages", fieldValue: "English, Spanish" },
        { fieldName: "Address", fieldValue: "123 Main St, Anytown, USA" },
    ],
};

// experience data

const Experience = {
    icon: "/assets/resume/badge.svg",
    title: "My experience",
    description: `
        I have experience working with the following technologies:
        - HTML
        - CSS
        - JavaScript
        - React
        - Figma
        - Node.js
        - Next.js
        - Tailwind CSS
    `,
    items: [
        {
            company: "Tech Solutions Inc.",
            position: "Software Developer",
            duration: "Jan 2020 - Present",
        },
        {
            company: "Web Designer Studio",
            position: "Front-End Developer Intern",
            duration: "Summer 2019",
        },
        {
            company: "E-Commerce Company Ltd. (Startup)",
            position: "Freelance Web Developer",
            duration: "2018- early 2019",
        },
        {
            company: "Tech Academy",
            position: "Teaching Assistant",
            duration: "2017 - 2018",
        },
        {
            company: "Digital Academy",
            position: "UI/UX Designer",
            duration: "2016 - 2017",
        },
        {
            company: "Software Development Firm",
            position: "Junior Developer",
            duration: "2015 - 2016",
        },
    ],
};

// education data
// template here for later use for now do what ever u want ||
// {
//     course: "Front-End Web Development",
//     institution: "Tech Academy",
//     duration: "2017 - 2018",
// }

const Education = {
    icon: "/assets/Resume/cap.svg",
    title: "My education",
    description: `
        I have completed the following courses:`,
    items: [
        {
            institution: "Tech Academy",
            degree: "Full Stack Web Development Bootcamp",
            duration: "2017 - 2018",
        },
        {
            institution: "Codecademy",
            degree: "Front-End Track",
            duration: "2016 - 2017",
        },
        {
            institution: "online course",
            degree: "Programming course",
            duration: "2015 - 2016",
        },
        {
            institution: "Design School",
            degree: "Graphic Design",
            duration: "2014 - 2015",
        },
        {
            institution: "Community College",
            degree: "Associated Degree in Computer Science",
            duration: "2011- 2014",
        },
    ],
};

// skills data

const Resume = () => {
    return <div>Resume page</div>;
};

export default Resume;
