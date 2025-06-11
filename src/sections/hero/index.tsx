import React, { useState, useEffect } from "react";
import Tag from "../../components/Tag";
import "./index.css";
import BlurText from "../../components/BlurText";
import BlobGrower from "../../components/BlobGrower";
import FloatingTag from "../../components/FloatingTag";

const Hero = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  return (
    <>
      <BlobGrower isLoaded={fontsLoaded}>
        <section className="w-full min-h-screen flex items-center justify-center bg-white">
          <div className="relative w-[90vw] max-w-[1100px] h-[80vh] flex items-center justify-center">
            <BlurText
              text="Passionate about user experiences and the teams that build them."
              delay={200}
              animateBy="words"
              direction="top"
              className="text-center font-semibold text-5xl sm:text-6xl md:text-[6rem]/22 text-black tracking-tight px-8 sm:px-12 md:px-20"
            />
            {/* Driven by great user experiences—and the teams behind them.
Building great UX starts with great teams. */}
            <Tag
              text="Blending"
              outerDivClassName="absolute top-[44%] left-[12%] text-xs sm:text-sm"
              innerDivClassName="bg-[#F4799A]"
              delay={1}
            />
            <Tag
              text="technical"
              outerDivClassName="absolute top-[37%] left-[28%] text-xs sm:text-sm"
              innerDivClassName="bg-[#F2FF9C]"
              delay={1.4}
            />
            <Tag
              text="skills"
              outerDivClassName="absolute top-[46%] left-[45%] text-xs sm:text-sm"
              innerDivClassName="bg-[#FFC399]"
              delay={1.8}
            />
            <Tag
              text="with"
              outerDivClassName="absolute top-[52%] right-[30%] text-xs sm:text-sm"
              innerDivClassName="bg-[#F9E8F9]"
              delay={2.2}
            />
            <Tag
              text="leadership"
              outerDivClassName="absolute top-[60%] right-[12%] text-xs sm:text-sm"
              innerDivClassName="bg-[#B8C466]"
              delay={2.6}
            />

            <div className="absolute bottom-0 text-center text-base md:text-lg font-medium text-black tracking-tight px-4">
              Full-stack developer at TELUS based in Vancouver, BC
            </div>
          </div>
        </section>
      </BlobGrower>
    </>
  );
};

export default Hero;
