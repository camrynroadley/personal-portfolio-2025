import type { JSX } from "react";
import { clsx } from "clsx";

interface TagProps {
  text: string;
  className?: string;
}

const Tag = ({ text, className }: TagProps): JSX.Element => {
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded px-1 bg-white border border-black border-solid track-tighter font-medium uppercase tracking-tight",
        className
      )}
      style={{ minWidth: "auto" }}
    >
      {text}
    </div>
  );
};

export default Tag;
