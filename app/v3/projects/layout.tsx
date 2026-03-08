import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects — Aditya",
    description: "A collection of things I've built — CLI tools, web apps, backend services and more.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
