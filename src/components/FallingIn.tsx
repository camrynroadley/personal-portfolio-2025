// components/FallingIn.tsx
import { motion } from "framer-motion";
import { ReactNode } from "react";

type FallingInProps = {
  children: ReactNode;
  delay?: number; // optional delay in seconds
  duration?: number; // optional duration
};

const FallingIn = ({ children, delay = 0, duration = 0.8 }: FallingInProps) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay,
        duration,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FallingIn;
