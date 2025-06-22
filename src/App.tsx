import { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import "./index.css";
import "./assets/fontawesome";
import Navbar from "./components/Navbar";
import Hero from "./sections/hero";
import Spinner from "./components/Spinner";
import { Bento } from "./sections/bento";

function App() {
  const [mounted, setMounted] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  const [navbarTheme, setNavbarTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    return scrollY.onChange((y) => {
      // Assuming Hero is the first 100vh (adjust as needed)
      setNavbarTheme(y < window.innerHeight * 0.9 ? "dark" : "light");
    });
  }, [scrollY]);

  const [selected, setSelected] = useState<"About" | "Work" | "Projects" | "">(
    ""
  );


  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const connectRef = useRef<HTMLElement>(null);

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

  return (
    <ThemeProvider theme={theme}>
      <div className="relative bg-white mb-24 xl:mb-0">
        {!fontsLoaded ? (
          <Spinner />
        ) : (
          <>
            {/* <Navbar
              selected={selected}
              setSelected={setSelected}
              theme={navbarTheme}
            /> */}

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
