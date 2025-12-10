"use client";

import Work from "@/components/sections/Work";
import PageTransition from "@/components/PageTransition"; 
// Assuming a PageTransition exists or similar, if not just normal div.
// The user didn't mention PageTransition but the main layout might have it.
// I'll just use a main wrapper.

const WorkPage = () => {
  return (
    <main>
      <Work isPage={true} />
    </main>
  );
};

export default WorkPage;
