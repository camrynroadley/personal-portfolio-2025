import { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import "./index.css";
import "./assets/fontawesome";
import { Navbar } from "./components/Navbar";
import Hero from "./sections/hero";
import { Spinner } from "./components/Spinner";
import { Bento } from "./sections/bento";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    let fontReady = false;
    let pageReady = false;

    const checkIfReady = () => {
      if (fontReady && pageReady) {
        setIsReady(true);
      }
    };
    const fontPromises = [
      document.fonts.load('1em "DM Sans"'),
      document.fonts.load('1em "AppleGaramondLight"'),
    ];

    Promise.all(fontPromises).then(() => {
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
    return scrollY.onChange((y) => {
      setShowNavbar(y < 30);
    });
  }, [scrollY]);

  const theme = createTheme({
    typography: {
      fontFamily: "DM Sans, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="relative bg-white mb-24 xl:mb-0">
        {!isReady ? (
          <Spinner />
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
                >
                  <Navbar />
                </motion.div>
              )}
            </AnimatePresence>
            <main ref={mainRef}>
              <section className="md:sticky md:top-0 z-10">
                <Hero />
              </section>
              <section className="min-h-screen relative z-20 bg-transparent flex md:items-center md:justify-center">
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
