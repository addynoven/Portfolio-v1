import { ReactNode } from "react";

export interface InfoItem {
    fieldName: string;
    fieldValue: string;
}

export interface AboutData {
    title: string;
    description: string;
    info: InfoItem[];
}

export interface ExperienceItem {
    company: string;
    position: string;
    duration: string;
}

export interface ExperienceData {
    icon: string;
    title: string;
    description: string;
    items: ExperienceItem[];
}

export interface EducationItem {
    institution: string;
    degree: string;
    duration: string;
}

export interface EducationData {
    icon: string;
    title: string;
    description: string;
    items: EducationItem[];
}

export interface SkillItem {
    name: string;
    icon: ReactNode;
}

export interface SkillsData {
    title: string;
    description: string;
    skillList: SkillItem[];
}

export interface StackItem {
    name: string;
}

export interface ProjectItem {
    num: string;
    category: string;
    title: string;
    description: string;
    href: string;
    image: string;
    Stack: StackItem[];
    live: string;
    github: string;
}

export interface ServiceItem {
    num: string;
    title: string;
    Description: string;
    href: string;
}

export interface ContactInfoItem {
    title: string;
    icon: ReactNode;
    description: ReactNode;
    value: string; // Plain text version for clipboard copy
}
