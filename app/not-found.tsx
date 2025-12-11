"use client";

import { Button } from "@/components/ui/button";
import FuzzyText from "@/components/reactbits/TextAnimations/FuzzyText";
import TrueFocus from "@/components/reactbits/TextAnimations/TrueFocus";
import FallingText from "@/components/reactbits/TextAnimations/FallingText";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
                <div className="mb-8 flex justify-center">
        <FuzzyText 
          fontSize="clamp(6rem, 20vw, 20rem)"
          fontWeight={900}
          color="#00ff99"
          enableHover={true}
          baseIntensity={0.15}
          hoverIntensity={0.5}
        >
          404
        </FuzzyText>
      </div>
      <div className="mb-6 flex justify-center w-full">
        <TrueFocus 
          sentence="Page Not Found"
          manualMode={false}
          blurAmount={5}
          borderColor="#00ff99"
          glowColor="rgba(0, 255, 153, 0.6)"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
      </div>
      
      <div className="h-40 w-full max-w-md mx-auto relative z-10">
        <FallingText
          text="Oops! The page you're looking for doesn't exist or has been moved."
          highlightWords={["doesn't", "exist", "moved"]}
          trigger="auto"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.5}
          fontSize="1.125rem"
          mouseConstraintStiffness={0.9}
        />
      </div>
          <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
            <Button size="lg" className="uppercase">
              Back to Home
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
