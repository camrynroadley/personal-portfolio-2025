import { useState, useEffect, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./sections/hero";
import Work from "./sections/work";
import Projects from "./sections/projects";
import About from "./sections/about";
import Footer from "./sections/footer";
import { Modal } from "./components/Modal";

function App() {
  const [mounted, setMounted] = useState(false);
  const [showBigSandModal, setShowBigSandModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);

  // Inside your component
  const mainRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  console.log('*** scrolled: ', scrolled)

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
  if (!mounted) return null;

  const handleCloseBigSandModal = () => {
    setShowBigSandModal(false);
  };

  const handleCardClicked = (slug: string) => {
    console.log("*** card clicked: ", slug);
    if (slug === "big_sand") {
      setShowBigSandModal(true);
    } else if (slug === "portfolio") {
      setShowPortfolioModal(true);
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: "DM Sans, sans-serif",
    },
  });

  const sections = [
    { id: "hero", component: <Hero /> },
    { id: "work", component: <Work /> },
    {
      id: "projects",
      component: <Projects handleCardClicked={handleCardClicked} />,
    },
    { id: "about", component: <About /> },
    { id: "footer", component: <Footer /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="relative">
        {showBigSandModal && (
          <Modal isOpen={showBigSandModal} onClose={handleCloseBigSandModal}>
            <h1>test big sand</h1>
          </Modal>
        )}
        <Navbar scrolled={scrolled} />
        <main
          ref={mainRef}
          className="relative h-screen overflow-y-scroll scroll-smooth"
        >
          {sections.map((section, i) => (
            <section
              key={section.id}
              className={`sticky top-0 h-screen`}
              style={{ zIndex: i + 1 }}
            >
              {section.component}
            </section>
          ))}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
