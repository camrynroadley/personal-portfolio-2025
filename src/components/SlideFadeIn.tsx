import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface SlideFadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  "data-testid"?: string;
  ariaLabel?: string;
  role?: string;
}

export const SlideFadeIn = ({
  children,
  delay = 0,
  className = "",
  "data-testid": testId,
  ariaLabel,
  role = "region",
}: SlideFadeInProps) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1, delay }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      data-testid={testId}
      aria-label={ariaLabel}
      role={ariaLabel ? role : undefined}
    >
      {children}
    </motion.div>
  );
};
