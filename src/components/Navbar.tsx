import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { colors } from "../constants";

export const Navbar = () => {
  const [githubOpen, setGithubOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        githubOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setGithubOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [githubOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (githubOpen) {
        setGithubOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [githubOpen]);

  useEffect(() => {
    if (githubOpen) {
      timeoutRef.current = setTimeout(() => setGithubOpen(false), 5000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [githubOpen]);

  return (
    <header
      className="fixed top-4 left-0 w-full z-50 px-6"
      role="navigation"
      aria-label="Main site navigation"
      data-testid="navbar"
    >
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
        <a
          href="#"
          className={clsx(
            "text-sm text-black font-medium tracking-tight hover:underline"
          )}
        >
          Camryn Roadley
        </a>

        <div className="flex items-center gap-2 relative">
          <div
            style={{ backgroundColor: colors.DARKEST_GRAY }}
            className="flex px-3 py-2 rounded-full items-center gap-2 relative"
          >
            <a
              href="https://www.linkedin.com/in/camrynroadley/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:cursor-pointer"
              aria-label="LinkedIn profile (opens in new tab)"
              data-testid="navbar-linkedin"
            >
              <FontAwesomeIcon icon={["fab", "linkedin"]} size="lg" />
            </a>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setGithubOpen((prev) => !prev)}
                className="text-white cursor-pointer"
                aria-haspopup="true"
                aria-expanded={githubOpen}
                aria-controls="github-dropdown"
                aria-label="Toggle GitHub links menu"
                data-testid="navbar-github-button"
              >
                <FontAwesomeIcon icon={["fab", "github"]} size="lg" />
              </button>

              <AnimatePresence>
                {githubOpen && (
                  <motion.div
                    id="github-dropdown"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="absolute right-0 top-8 bg-[#2F2F2F] text-white text-sm rounded-lg shadow-md p-2 space-y-1 z-50"
                    role="menu"
                    aria-label="GitHub links"
                    data-testid="navbar-github-dropdown"
                  >
                    <a
                      href="https://github.com/camrynroadley"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-1 hover:bg-[#3F3F3F] rounded transition"
                      role="menuitem"
                      aria-label="Personal GitHub profile (opens in new tab)"
                      data-testid="navbar-github-personal"
                    >
                      Personal GitHub
                    </a>
                    <a
                      href="https://github.com/croadley"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-1 hover:bg-[#3F3F3F] rounded transition"
                      role="menuitem"
                      aria-label="Professional GitHub profile (opens in new tab)"
                      data-testid="navbar-github-professional"
                    >
                      Professional GitHub
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
