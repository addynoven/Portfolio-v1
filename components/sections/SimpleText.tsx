"use client";

import ScrollReveal from "@/components/reactbits/TextAnimations/ScrollReveal";

const SimpleText = () => {
  return (
    <section className="py-20 xl:py-32 relative z-20">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal
            baseOpacity={0.3}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
            textClassName="text-slate-900 dark:text-white/90"
          >
            When does a man die? When he is hit by a bullet? No! When he suffers a disease?
            No! When he ate a soup made out of a poisonous mushroom?
            No! A man dies when he is forgotten!
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default SimpleText;
