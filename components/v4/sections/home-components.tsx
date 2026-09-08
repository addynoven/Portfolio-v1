"use client";

import React from "react";
import Link from "next/link";
import { COMPONENTS_CATALOG } from "@/lib/v4/constants";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

export function HomeComponents() {
  const previewItems = [
    {
      id: "swipe-theme",
      name: "Swipe Theme Provider",
      date: "August 2026",
      href: "/v4/components#swipe-theme",
      preview: (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-neutral-200 dark:bg-neutral-900">
          <div className="absolute inset-0 w-1/2 -skew-x-12 transform bg-neutral-400 dark:bg-neutral-700" />
        </div>
      ),
    },
    {
      id: "circular-theme",
      name: "Circular Theme Provider",
      date: "August 2026",
      href: "/v4/components#circular-theme",
      preview: (
        <div className="relative flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-900">
          <div className="h-6 w-6 rounded-full border-2 border-dashed border-neutral-400 dark:border-neutral-600" />
        </div>
      ),
    },
    {
      id: "split-theme",
      name: "Split Theme Provider",
      date: "August 2026",
      href: "/v4/components#split-theme",
      preview: (
        <div className="grid h-full w-full grid-cols-2">
          <div className="bg-neutral-300 dark:bg-neutral-800" />
          <div className="bg-neutral-100 dark:bg-neutral-950" />
        </div>
      ),
    },
    {
      id: "word-focus",
      name: "Word Focus Scroll",
      date: "July 2026",
      href: "/v4/components#word-focus",
      preview: (
        <div className="flex h-full w-full items-center justify-center gap-1 bg-neutral-200 px-2 dark:bg-neutral-900">
          <div className="h-2 w-3 rounded-sm bg-neutral-400 dark:bg-neutral-600" />
          <div className="h-2 w-5 rounded-sm bg-neutral-900 dark:bg-white" />
          <div className="h-2 w-2 rounded-sm bg-neutral-400 dark:bg-neutral-600" />
        </div>
      ),
    },
  ];

  return (
    <div
      data-section="Components"
      className="rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white dark:bg-[#111111]/80 p-6 sm:p-8 flex flex-col items-start w-full shadow-sm"
    >
      <div className="mb-6 flex w-full items-center justify-between">
        <h2 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white">
          Components on great-ui.com
        </h2>
        <Link
          href="/v4/components"
          className="group flex items-center gap-2"
        >
          <span className="text-sm font-medium text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white">
            View all
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-neutral-300 dark:border-neutral-800/60 dark:bg-[#0f0f0f] dark:group-hover:border-neutral-700">
            <FiArrowRight className="w-3 h-3 text-neutral-500 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white" />
          </div>
        </Link>
      </div>

      <div className="flex w-full flex-col gap-2">
        {previewItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link
              href={item.href}
              className="group -mx-2 flex w-full cursor-pointer items-center justify-between rounded-2xl py-2 pl-2 pr-3 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-[48px] w-[72px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-100 dark:bg-[#0f0f0f] border border-neutral-200/60 dark:border-neutral-800 transition-transform group-hover:scale-105">
                  {item.preview}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[15px] leading-tight font-medium text-neutral-900 transition-colors group-hover:text-neutral-950 dark:text-neutral-200 dark:group-hover:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[13px] text-neutral-500">{item.date}</p>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5">
                <FiArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
