"use client";

import Work from "@/components/v1/Work";
import PageTransition from "@/components/v1/PageTransition"; 
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
