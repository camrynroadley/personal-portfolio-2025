import { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  AnimatePresence,
} from "framer-motion";
import "./index.css";
import "./assets/fontawesome";
import { Navbar } from "./components/Navbar";
import Hero from "./sections/hero";
import { Spinner } from "./components/Spinner";
import { Bento } from "./sections/bento";

function App() {
  const [mounted, setMounted] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [navbarReady, setNavbarReady] = useState(false);
const [heroReady, setHeroReady] = useState(false);
const [bentoReady, setBentoReady] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const [navbarTheme, setNavbarTheme] = useState<"dark" | "light">("dark");
  const allReady = mounted && fontsLoaded && navbarReady && heroReady && bentoReady;

  const [isReady, setIsReady] = useState(false);


  useEffect(() => {
    return scrollY.onChange((y) => {
      setNavbarTheme(y < window.innerHeight * 0.9 ? "dark" : "light");
    });
  }, [scrollY]);

  const [selected, setSelected] = useState<"About" | "Work" | "Projects" | "">(
    ""
  );

  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const connectRef = useRef<HTMLElement>(null);

  const [showNavbar, setShowNavbar] = useState(true);

useEffect(() => {
  let fontReady = false;
  let pageReady = false;

  const checkIfReady = () => {
    if (fontReady && pageReady) {
      setIsReady(true);
    }
  };

  // Load DM Sans and AppleGaramondLight
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
      setNavbarTheme(y < window.innerHeight * 0.9 ? "dark" : "light");
    });
  }, [scrollY]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      setScrolled(main.scrollTop > 50);
    };

    main.addEventListener("scroll", handleScroll);
    return () => main.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const aboutTop = aboutRef.current?.offsetTop || 0;
      const projectsTop = projectsRef.current?.offsetTop || 0;
      const connectTop = connectRef.current?.offsetTop || 0;
      const buffer = 100;

      if (scrollY >= connectTop - buffer) {
        setSelected("Connect");
      } else if (scrollY >= projectsTop - buffer) {
        setSelected("Projects");
      } else {
        setSelected("About");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const theme = createTheme({
    typography: {
      fontFamily: "DM Sans, sans-serif",
    },
  });

  console.log('*** is ready: ', isReady);
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
                <Navbar selected={selected} setSelected={setSelected} />
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
