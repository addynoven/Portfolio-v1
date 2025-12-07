"use client";

import CountUp from "react-countup";

const stats = [
  { num: 1, Text: "Years of Experience", suffix: "+" },
  { num: 20, Text: "Projects Completed", suffix: "+" },
  { num: 15, Text: "Technologies Mastered", suffix: "+" },
  { num: 500, Text: "Code Commits", suffix: "+" },
];

const Stats = () => {
  return (
    <section className="mt-10 pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((stat, index) => {
            return (
              <div
                className="flex flex-1 gap-4 items-center justify-center xl:justify-start"
                key={stat.Text}
              >
                <CountUp
                  end={stat.num}
                  duration={5}
                  delay={2}
                  suffix={stat.suffix || ""}
                  className="text-4xl xl:text-6xl font-extrabold"
                />

                <p
                  className={`${
                    stat.Text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                  } leading-snug text-slate-600 dark:text-white/80`}
                >
                  {stat.Text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
