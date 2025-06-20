import { type JSX, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

interface TagProps {
  text: string;
  isAnimated?: boolean;
  isFloating?: boolean;
  strength?: number;
  delay?: number; // 👈 NEW
  outerDivClassName?: string;
  innerDivClassName?: string;
}

const Tag = ({
  text,
  isAnimated = true,
  isFloating = true,
  strength = 20,
  delay = 0,
  outerDivClassName,
  innerDivClassName,
}: TagProps): JSX.Element => {
  const tagRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isFloating) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!tagRef.current) return;

      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;

      const offsetX = ((e.clientX - centerX) / centerX) * strength;
      const offsetY = ((e.clientY - centerY) / centerY) * strength;

      setOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength, isFloating]);

  const sharedTransition = {
    duration: 4,
    ease: "easeOut",
    times: [0, 0.1, 0.2, 0.9, 1],
    // times: [0, 0.3, 0.6, 1],
    repeat: Infinity,
    repeatDelay: 3,
    delay,
  };

  return (
    <div
      ref={tagRef}
      className={clsx(
        "inline-flex items-center justify-center rounded",
        outerDivClassName
      )}
      style={{
        transform: isFloating
          ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
          : undefined,
        transition: isFloating ? "transform 0.1s ease-out" : undefined,
        willChange: "transform",
      }}
    >
      <motion.div
        className={clsx(
          "rounded px-3 py-1 border border-black font-bold uppercase tracking-tighter shadow text-black",
          innerDivClassName
        )}
        style={{ minWidth: "auto" }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={
          isAnimated
            ? {
                scale: [0.2, 1.2, 1, 1, 0.2],
                opacity: [0, 1, 1, 1, 0],
                // scale: [0.2, 1.2, 0.95, 1],
                // opacity: [0, 1, 1, 0],
              }
            : undefined
        }
        transition={isAnimated ? sharedTransition : undefined}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + 0.4,
            ease: "easeOut",
          }}
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Tag;
