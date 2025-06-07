import React from "react";
import { clsx } from "clsx";

interface LinkWithArrowProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const LinkWithArrow = ({ children, href, className, ...props }: LinkWithArrowProps) => {
  return (
    <a
      href={href}
      className={clsx(
        "group inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <svg
        className="ml-1 h-4 w-4 text-blue-600 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </a>
  );
};

export default LinkWithArrow;
