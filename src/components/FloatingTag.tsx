import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type FloatingTagProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number; // how much the tag should move
};

export default function FloatingTag({
  children,
  className = "",
  strength = 20, // pixels of movement
}: FloatingTagProps) {
  const tagRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
  }, [strength]);

  return (
    <div
      ref={tagRef}
      className={clsx(
        "inline-flex items-center justify-center rounded px-3 py-1 bg-white border border-black font-semibold uppercase tracking-tight shadow",
        className
      )}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 0.1s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
