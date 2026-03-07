"use client";

import dynamic from "next/dynamic";

const QuoteRotator = dynamic(
    () => import("@/components/v3/sections/quote-rotator"),
    { ssr: false }
);

export default function QuoteRotatorWrapper() {
    return <QuoteRotator />;
}



