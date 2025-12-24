"use client";

import Link from "next/link";

const Home = () => {
  return (
    <section className="h-full flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-bold mb-4">Aditya Sahu</h1>
      <p className="text-xl mb-8">Full Stack Developer - V2 Coming Soon</p>
      
      <div className="flex gap-4">
        <Link 
          href="/v1" 
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80 transition-colors"
        >
          View Portfolio V1
        </Link>
      </div>
    </section>
  );
};

export default Home;
