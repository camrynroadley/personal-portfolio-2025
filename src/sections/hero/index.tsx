import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import clsx from "clsx";
import { Tag } from "../../components/Tag";
import { BlurText } from "../../components/BlurText";
import { SlideFadeIn } from "../../components/SlideFadeIn";
import { colors } from "../../constants";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const { scrollY } = useScroll();
  const yText = useSpring(useTransform(scrollY, [0, 1000], ["0%", "20%"]), {
    stiffness: 40,
    damping: 30,
  });
  const opacityText = useSpring(useTransform(scrollY, [0, 200], [1, 0]), {
    stiffness: 60,
    damping: 35,
  });

  return (
    <section
      className={clsx(
        "h-[100vh] md:h-[50vh] w-full overflow-hidden flex flex-col items-center justify-center bg-white z-10",
        "md:sticky md:top-0",
        className
      )}
    >
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative w-full max-w-[800px] px-10 md:px-12 flex flex-col items-center mt-16 gap-6"
      >
        <BlurText
          text="Full-stack developer focused on user experiences and the teams that build them."
          delay={200}
          animateBy="words"
          direction="top"
          className="font-semibold text-5xl sm:text-6xl md:text-[4.6rem]/16 text-black tracking-tight text-center"
        />
        {[
          { text: "Blending", top: "38%", left: "5%", bg: colors.PINK },
          { text: "technical", top: "15%", left: "24%", bg: colors.LIGHT_GREEN },
          { text: "skills", top: "38%", left: "44%", bg: colors.ORANGE },
          { text: "with", top: "56%", right: "30%", bg: colors.LAVENDER },
          { text: "leadership", top: "74%", right: "10%", bg: colors.DARK_GREEN},
        ].map((tag, i) => {
          return (
            <Tag
              key={tag.text}
              text={tag.text}
              outerDivClassName="absolute text-xs sm:text-sm"
              innerDivClassName={`bg-[${tag.bg}]`}
              delay={1 + i * 0.4}
              style={{
                top: tag.top,
                left: tag.left,
                right: tag.right,
                position: "absolute",
              }}
                backgroundColor={tag.bg}
            />
          );
        })}
      </motion.div>
      <motion.div
        style={{ opacity: opacityText, y: yText }}
        className="mt-8 text-black text-sm md:text-base font-medium tracking-tight text-center px-12 md:px-12"
      >
        <SlideFadeIn>
          Building commerce and checkout user experiences at TELUS.
        </SlideFadeIn>
      </motion.div>
    </section>
  );
};

export default Hero;
