// components/FadeInOnScroll.tsx
import { motion } from "framer-motion";

interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export const FadeInOnScroll = ({
  children,
  delay = 0.1,
  duration = 0.6,
}: FadeInOnScrollProps) => {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};
