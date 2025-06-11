// components/FallingIn.tsx
import { motion } from "framer-motion";
import React from "react";

interface FallingInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FallingIn: React.FC<FallingInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FallingIn;
