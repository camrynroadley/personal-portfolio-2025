import SlideFadeIn from "../../components/SlideFadeIn";
import { About } from "./about";
import Projects from "./projects";
import Work from "./work";

export const Bento = () => {
  return (
    <div className="grid grid-cols-1 gap-4 w-4/5 mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <SlideFadeIn className="md:basis-1/3 md:flex-shrink-0">
          <div className="h-full bg-[#161616] rounded-3xl py-6 px-6 md:py-8 md:px-8 flex flex-col">
            <About />
          </div>
        </SlideFadeIn>
        <SlideFadeIn className="md:basis-2/3 md:flex-grow">
          <div
            className="h-full bg-[#161616] rounded-3xl py-6 px-6 md:py-8 md:px-8 flex flex-col transition-all duration-300"
            id="work"
          >
            <Work />
          </div>
        </SlideFadeIn>
      </div>

      <SlideFadeIn>
        <div className="bg-[#161616] rounded-3xl py-6 px-6 md:py-8 md:px-8">
          <Projects />
        </div>
      </SlideFadeIn>
    </div>
  );
};
