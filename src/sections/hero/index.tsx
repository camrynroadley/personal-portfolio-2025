import React from "react";
import "./index.css";
import Tag from "../../components/Tag";
import BlobGrower from "../../components/BlobGrower";
import BlurText from "../../components/BlurText";
import FallingIn from "../../components/FallingIn";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const Hero = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <BlobGrower className="relative w-4/5 mx-auto">
        <BlurText
          text="Five years of development experience with a passion for leading squads and managing technical programs."
          delay={200}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => console.log("Animation completed!")}
          className="text-4xl sm:text-5xl md:text-6xl text-black tracking-tight px-6 md:px-16"
        />
        <FallingIn delay={300}>
          <Tag
            text="Blending"
            className="absolute top-10 left-6 sm:top-16 sm:left-20 text-xs sm:text-sm md:top-2/5 md:left-1/6"
          />
        </FallingIn>

        <Tag
          text="technical"
          className="absolute top-10 left-6 sm:top-16 sm:left-20 text-xs sm:text-sm md:top-2/5 md:left-1/6"
        />
        <Tag
          text="skills"
          className="absolute top-10 left-6 sm:top-16 sm:left-20 text-xs sm:text-sm md:top-3/5 md:left-1/3"
        />
        <Tag
          text="with"
          className="absolute top-10 left-6 sm:top-16 sm:left-20 text-xs sm:text-sm md:top-2/5 md:left-2/3"
        />
        <Tag
          text="leadership"
          className="absolute top-10 left-6 sm:top-16 sm:left-20 text-xs sm:text-sm md:top-2/5 md:left-4/6"
        />
        <div className="absolute w-3/4 bottom-32 md:bottom-32 text-sm md:text-sm text-center text-black tracking-tight">
          Full-stack developer at TELUS based in Vancouver, BC
        </div>
      </BlobGrower>
    </section>
  );
};

// const Hero: React.FC = () => {
//   return (
//     <section className="w-full h-screen flex items-center justify-center">
//       <BlobGrower className="relative">
//         <BlurText
//           text="Five years of development experience with a passion for leading squads and managing technical programs."
//           delay={200}
//           animateBy="words"
//           direction="top"
//           onAnimationComplete={handleAnimationComplete}
//           className="text-7xl text-black tracking-tight"
//         />
//         <Tag text="sample" className="absolute top-72 left-32" />
//          <div className="absolute bottom-32 tracking-tight">Full-stack developer at TELUS based in Vancouver, BC</div>
//       </BlobGrower>
//       {/* <div className="flex relative bg-[#D5D15D] h-4/5 rounded-3xl items-center justify-center text-center px-6">
//         <h1 className="w-4/5 text-6xl font-medium text-black tracking-tight">
//           Five years of development experience with a passion for leading squads
//           and managing technical programs.
//         </h1>
//         <Tag text="sample" className="absolute top-16 left-32" />
//         <div className="absolute bottom-8 tracking-tight">Full-stack developer at TELUS based in Vancouver, BC</div>
//       </div> */}
//     </section>
//   );
// };

export default Hero;
