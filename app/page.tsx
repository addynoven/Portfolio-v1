"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/v3");
  }, [router]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="text-UserAccent font-mono animate-pulse">Initializing V3...</div>
    </div>
  );
};

export default Home;
