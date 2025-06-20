import { useRef } from "react";
import "./index.css";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import Tag from "../../components/Tag";
import BlurText from "../../components/BlurText";
import SlideFadeIn from "../../components/SlideFadeIn";
import clsx from "clsx";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Hero text slides DOWN as user scrolls
  // const yText = useTransform(scrollY, [0, 600], ["0%", "5%"]);
  // const opacityText = useTransform(scrollY, [0, 500], [1, 0.2]);

  // Original transform — text moves down
  const rawYText = useTransform(scrollY, [0, 1000], ["0%", "5%"]);
  const rawOpacity = useTransform(scrollY, [0, 800], [1, 0.2]);

  // Add spring for gentle movement
  const yText = useSpring(rawYText, {
    stiffness: 60, // lower = gentler
    damping: 20, // higher = smoother stop
  });
  const opacityText = useSpring(rawOpacity, {
    stiffness: 80,
    damping: 25,
  });

  return (
    <section
      ref={containerRef}
      className={clsx(
        "sticky top-0 h-screen md:h-[50vh] w-4/5 md:w-2/3 mx-auto flex flex-row bg-white z-10",
        className
      )}
    >
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative w-[75vw] max-w-[700px] flex-4 flex items-center"
      >
        <BlurText
          text="Full-stack developer focused on user experiences and the teams that build them."
          delay={200}
          animateBy="words"
          direction="top"
          className="font-semibold text-5xl sm:text-6xl md:text-[4.5rem]/16 text-black tracking-tight"
        />
        <Tag
          text="Blending"
          outerDivClassName="absolute top-[44%] left-[12%] text-xs sm:text-sm"
          innerDivClassName="bg-[#F4799A]"
          delay={1}
        />
        <Tag
          text="technical"
          outerDivClassName="absolute top-[37%] left-[28%] text-xs sm:text-sm"
          innerDivClassName="bg-[#F2FF9C]"
          delay={1.4}
        />
        <Tag
          text="skills"
          outerDivClassName="absolute top-[46%] left-[45%] text-xs sm:text-sm"
          innerDivClassName="bg-[#FFC399]"
          delay={1.8}
        />
        <Tag
          text="with"
          outerDivClassName="absolute top-[52%] right-[30%] text-xs sm:text-sm"
          innerDivClassName="bg-[#F9E8F9]"
          delay={2.2}
        />
        <Tag
          text="leadership"
          outerDivClassName="absolute top-[60%] right-[12%] text-xs sm:text-sm"
          innerDivClassName="bg-[#B8C466]"
          delay={2.6}
        />
      </motion.div>
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="text-right text-black text-sm md:text-base font-medium tracking-tight relative w-[5vw] max-w-[700px] flex-1 flex items-center"
      >
        <SlideFadeIn>
          Currently building commerce and checkout user experiences at TELUS in
          Vancouver, BC.
        </SlideFadeIn>
      </motion.div>
    </section>
  );
};

export default Hero;
