import { useState, useEffect } from "react";
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

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleCloseBigSandModal = () => {
      setShowBigSandModal(false);
  }

  const handleCardClicked = (slug: string) => {
    console.log('*** card clicked: ', slug);
    if (slug === 'big_sand') {
      setShowBigSandModal(true);
    } else if (slug === 'portfolio') {
      setShowPortfolioModal(true);
    }
  }

  return (
    <div className="bg-[#151515]">
      <div className="flex flex-col mx-auto">
        {showBigSandModal && (
          <Modal isOpen={showBigSandModal} onClose={handleCloseBigSandModal}>
            <h1>test big sand</h1>
          </Modal>
        )}
        <Navbar />
        <Hero />
        <Work />
        <Projects handleCardClicked={(e) => handleCardClicked(e)} />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default App;
