import React, { useEffect, useState } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-4 left-6 z-50 text-sm text-white tracking-tight">Camryn Roadley</div>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ease-in-out">
        <nav
          className={`px-6 py-3 flex items-center space-x-8 text-sm text-white tracking-tight transition-all duration-500 ease-in-out
            ${
              scrolled
                ? 'bg-black/50 backdrop-blur-md shadow-lg rounded-full'
                : 'bg-transparent'
            }`}
        >
          <a href="#work" className="hover:underline transition">Work</a>
          <a href="#projects" className="hover:underline transition">Projects</a>
          <a href="#about" className="hover:underline transition">About</a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
