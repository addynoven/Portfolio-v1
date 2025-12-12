"use client";

import ScrollReveal from "@/components/reactbits/TextAnimations/ScrollReveal";

import BlurText from "../reactbits/TextAnimations/BlurText";
import Typewriter from "typewriter-effect";

const AboutMe = () => {
  return (
    <section id="about" className="py-20 xl:py-32 relative z-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Typewriter
              options={{
                strings: [
                  "About Me"
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 80,
                cursor: "_",
                cursorClassName: "text-UserAccent",
                wrapperClassName: "text-4xl font-bold text-UserAccent",
              }}
          />
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            textClassName="text-slate-900 dark:text-white/90"
            fontSize="1.6rem"
          >
            I build things that actually work in the real world — sharp, fast, and user-friendly. Mostly focused on AI now, experimenting with models, fine-tuning, and pushing practical features into real products. Still love understanding how systems fit together, from backend design to deployment.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
