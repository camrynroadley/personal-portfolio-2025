"use client";

import { motion } from "framer-motion";
import { useEffect, useState, ReactNode } from "react";
import { clsx } from "clsx";
import { useBreakpoint } from "../hooks/useBreakpoint";

type BlobGrowerProps = {
  className?: string;
  children?: ReactNode;
  isLoaded?: boolean;
};

export default function BlobGrower({
  className,
  children,
  isLoaded,
}: BlobGrowerProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setExpanded(true);
    }
  }, [isLoaded]);

  const breakpoint = useBreakpoint();

  if (!breakpoint) return null; // wait until client-side mount
  console.log("*** breakpoint: ", breakpoint);

  // Use fixed values per breakpoint
  let width = 1100;
  let height = 600;

  if (breakpoint === "xs" || breakpoint === "sm") {
    width = 320;
    height = 650;
  } else if (breakpoint === "md") {
    width = 600;
    height = 500;
  }

  return (
    <div
      className={clsx("flex items-center justify-center h-screen bg-black", className)}
    >
      <motion.div
        animate={{
          width: expanded ? "100%" : 50,
          height: expanded ? "100%" : 50,
          borderRadius: expanded ? "0%" : "50%",
          backgroundColor: "#D5D15D",
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 300,
        }}
        className="flex items-center justify-center"
      >
        {expanded ? children : null}
      </motion.div>
    </div>
    // <div
    //   className={clsx("flex items-center justify-center h-screen", className)}
    // >
    //   <motion.div
    //     animate={{
    //       width: expanded ? 1100 : 50,
    //       height: expanded ? 600 : 50,
    //       borderRadius: expanded ? "3rem" : "50%",
    //       backgroundColor: "#D5D15D",
    //     }}
    //     transition={{
    //       type: "spring",
    //       stiffness: 100,
    //       damping: 15,
    //     }}
    //     className={clsx("shadow-lg", "flex items-center justify-center")}
    //   >
    //     {expanded ? children : null}
    //   </motion.div>
    // </div>
  );
}
