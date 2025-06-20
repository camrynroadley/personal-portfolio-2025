import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

type NavbarProps = {
  theme: string;
  selected: NavItem;
  setSelected: (item: NavItem) => void;
};

type NavItem = "About" | "Work" | "Projects" | "";

const NAV_ITEMS: NavItem[] = ["About", "Work", "Projects"];

export default function Navbar({ theme, selected, setSelected }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDarkMode = theme === "dark";
  return (
    <header className="fixed top-4 left-0 w-full z-50 px-6">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
        <a
          href="#"
          className={clsx(
            "text-sm font-medium tracking-tight hover:underline",
            isDarkMode ? "text-black" : "text-white"
          )}
        >
          Camryn Roadley
        </a>
        {/* <nav className="hidden sm:flex bg-[#161616] px-4 py-2 rounded-full space-x-4 text-white text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              onClick={() => setSelected(item)}
              className="relative px-4 py-1 rounded-full transition-colors duration-300 hover:underline hover:cursor-pointer"
            >
              {selected === item && (
                <motion.span
                  layoutId="highlight"
                  className="absolute inset-0 rounded-full bg-[#2F2F2F] z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item}</span>
            </a>
          ))}
        </nav> */}
        <div className="flex items-center gap-2 relative">
          <div className="hidden sm:flex bg-[#161616] px-3 py-2 rounded-full items-center gap-2 relative group">
            <a
              href="https://www.linkedin.com/in/camrynroadley/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={["fab", "linkedin"]} size="lg" />
            </a>
            <div className="relative">
              <FontAwesomeIcon
                icon={["fab", "github"]}
                size="lg"
                className="text-white cursor-pointer"
              />
              <div className="absolute right-0 top-8 bg-[#2F2F2F] text-white text-sm rounded-lg shadow-md p-2 space-y-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
                <a
                  href="https://github.com/camrynroadley"
                  target="_blank"
                  className="block px-3 py-1 hover:bg-[#3F3F3F] rounded transition"
                >
                  Personal GitHub
                </a>
                <a
                  href="https://github.com/croadley"
                  target="_blank"
                  className="block px-3 py-1 hover:bg-[#3F3F3F] rounded transition"
                >
                  Professional GitHub
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="sm:hidden text-white p-2"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden mt-4 bg-[#161616] rounded-xl px-6 py-4 text-white text-sm font-medium space-y-2 shadow-md w-full max-w-screen-sm mx-auto"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={LINK_MAP[item]}
                onClick={() => setSelected(item)}
                className="block w-full text-left px-3 py-2 rounded hover:bg-[#2F2F2F] transitiontransition-colors duration-300"
              >
                {selected === item && (
                  <motion.span
                    layoutId="highlight"
                    className="z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </a>
            ))}
            <div className="flex gap-4 pt-4 border-t border-[#2f2f2f]">
              <a
                href="https://github.com/camrynroadley"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition"
              >
                <FontAwesomeIcon icon={["fab", "linkedin"]} size="lg" />
              </a>
              <a
                href="https://github.com/YOUR_PERSONAL"
                target="_blank"
                className="text-white hover:text-gray-300 transition"
              >
                <FontAwesomeIcon icon={["fab", "square-github"]} size="lg" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
