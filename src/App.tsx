import { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import "./index.css";
import "./assets/fontawesome";
import { Hero } from "./sections/hero";
import { Bento } from "./sections/bento";
import { Navbar } from "./components/Navbar";
import { Spinner } from "./components/Spinner";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Font + page load readiness
  useEffect(() => {
    let fontReady = false;
    let pageReady = false;

    const checkIfReady = () => {
      if (fontReady && pageReady) setIsReady(true);
    };

    Promise.all([
      document.fonts.load('1em "DM Sans"'),
      document.fonts.load('1em "AppleGaramondLight"'),
    ]).then(() => {
      fontReady = true;
      checkIfReady();
    });

    const handleWindowLoad = () => {
      pageReady = true;
      checkIfReady();
    };

    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad);
      return () => window.removeEventListener("load", handleWindowLoad);
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [isReady]);

  // Show/hide navbar on scroll
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setShowNavbar(y < 30);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const theme = createTheme({
    typography: {
      fontFamily: "DM Sans, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="relative bg-white mb-24 xl:mb-0" data-testid="app-root">
        {!isReady ? (
          <Spinner data-testid="spinner" />
        ) : (
          <>
            <AnimatePresence mode="wait">
              {showNavbar && (
                <motion.div
                  key="navbar"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="fixed top-0 left-0 right-0 z-20"
                  aria-label="Site navigation"
                  role="navigation"
                  data-testid="navbar-wrapper"
                >
                  <Navbar data-testid="navbar" />
                </motion.div>
              )}
            </AnimatePresence>
            <main
              ref={mainRef}
              role="main"
              aria-label="Main content"
              data-testid="main"
            >
              <section
                className="md:sticky md:top-0 z-10"
                aria-labelledby="hero-heading"
                data-testid="hero-section"
              >
                <Hero />
              </section>
              <section
                className="min-h-screen relative z-20 bg-transparent flex md:items-center md:justify-center"
                aria-labelledby="bento-heading"
                data-testid="bento-section"
              >
                <Bento />
              </section>
            </main>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
