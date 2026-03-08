"use client";

import SidebarNavClient from "@/components/v3/layout/SidebarNavClient";
import { useLanguage } from "@/context/v3/language-context";

const NAV_ITEMS = [
  { id: "hero", label: { en: "Home", jp: "ホーム" } },
  { id: "commits", label: { en: "Contributions", jp: "コントリビューション" } },
  { id: "experience", label: { en: "Experience", jp: "経歴" } },
  { id: "skills", label: { en: "Skills", jp: "スキル" } },
  { id: "blogs", label: { en: "Blogs", jp: "ブログ" } },
  { id: "projects", label: { en: "Projects", jp: "プロジェクト" } },
];

export default function SidebarNav() {
  const { t } = useLanguage();
  const translatedItems = NAV_ITEMS.map(item => ({
    ...item,
    label: t(item.label)
  }));

  return <SidebarNavClient items={translatedItems} />;
}


