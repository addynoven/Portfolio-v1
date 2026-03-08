import SidebarNavClient from "@/components/v3/layout/SidebarNavClient";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "contributions", label: "Contributions" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "blogs", label: "Blogs" },
  { id: "projects", label: "Projects" },
];

export default function SidebarNav() {
  return <SidebarNavClient items={NAV_ITEMS} />;
}


