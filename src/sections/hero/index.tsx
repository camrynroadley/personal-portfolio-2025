import { useRef } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import clsx from "clsx";
import Tag from "../../components/Tag";
import BlurText from "../../components/BlurText";
import SlideFadeIn from "../../components/SlideFadeIn";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  const yText = useSpring(
    useTransform(scrollY, [0, 1000], ["0%", "5%"]),
    { stiffness: 60, damping: 20 }
  );

  const opacityText = useSpring(
    useTransform(scrollY, [0, 200], [1, 0]),
    { stiffness: 80, damping: 25 }
  );

  return (
    <section
      ref={containerRef}
      className={clsx(
        "sticky top-0 h-screen md:h-[50vh] w-full overflow-hidden flex flex-col items-center bg-white z-10",
        className
      )}
    >
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative w-[90vw] max-w-[850px] flex-1 flex items-center"
      >
        <BlurText
          text="Full-stack developer focused on user experiences and the teams that build them."
          delay={200}
          animateBy="words"
          direction="top"
          className="font-semibold text-5xl sm:text-6xl md:text-[4.5rem]/16 text-black tracking-tight px-8 sm:px-12 md:px-20 justify-center"
        />
        {[
          { text: "Blending", top: "44%", left: "12%", bg: "#F4799A" },
          { text: "technical", top: "37%", left: "28%", bg: "#F2FF9C" },
          { text: "skills", top: "46%", left: "45%", bg: "#FFC399" },
          { text: "with", top: "52%", right: "30%", bg: "#F9E8F9" },
          { text: "leadership", top: "60%", right: "12%", bg: "#B8C466" },
        ].map((tag, i) => (
          <Tag
            key={tag.text}
            text={tag.text}
            outerDivClassName={clsx(
              "absolute text-xs sm:text-sm",
              tag.left ? `top-[${tag.top}] left-[${tag.left}]` : `top-[${tag.top}] right-[${tag.right}]`
            )}
            innerDivClassName={`bg-[${tag.bg}]`}
            delay={1 + i * 0.4}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="absolute bottom-10 w-full text-center text-black text-sm md:text-base font-medium tracking-tight"
      >
        <SlideFadeIn>
          Currently building commerce and checkout user experiences at TELUS in Vancouver, BC.
        </SlideFadeIn>
      </motion.div>
    </section>
  );
};

export default Hero;