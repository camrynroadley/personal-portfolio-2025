import { SlideFadeIn } from "../../components/SlideFadeIn";
import { colors } from "../../constants";
import { About } from "./about";
import Projects from "./projects";
import Work from "./work";

export const Bento = () => {
  return (
    <div
      className="grid grid-cols-1 gap-4 w-4/5 mx-auto"
      role="region"
      aria-label="Bento content sections"
      data-testid="bento"
    >
      {/* About + Work */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* About Section */}
        <SlideFadeIn className="md:basis-1/3 md:flex-shrink-0">
          <section
            style={{ backgroundColor: colors.DARKEST_GRAY }}
            className="h-full rounded-3xl py-6 px-6 md:py-8 md:px-8 flex flex-col"
            aria-labelledby="about-heading"
            role="region"
            data-testid="about-section"
          >
            <h2 id="about-heading" className="sr-only">
              About Section
            </h2>
            <About />
          </section>
        </SlideFadeIn>

        {/* Work Section */}
        <SlideFadeIn className="md:basis-2/3 md:flex-grow">
          <section
            style={{ backgroundColor: colors.DARKEST_GRAY }}
            className="h-full rounded-3xl py-6 px-6 md:py-8 md:px-8 flex flex-col transition-all duration-300"
            id="work"
            aria-labelledby="work-heading"
            role="region"
            data-testid="work-section"
          >
            <h2 id="work-heading" className="sr-only">
              Work Experience Section
            </h2>
            <Work />
          </section>
        </SlideFadeIn>
      </div>

      {/* Projects Section */}
      <SlideFadeIn>
        <section
          style={{ backgroundColor: colors.DARKEST_GRAY }}
          className="rounded-3xl py-6 px-6 md:py-8 md:px-8"
          aria-labelledby="projects-heading"
          role="region"
          data-testid="projects-section"
        >
          <h2 id="projects-heading" className="sr-only">
            Projects Section
          </h2>
          <Projects />
        </section>
      </SlideFadeIn>
    </div>
  );
};
