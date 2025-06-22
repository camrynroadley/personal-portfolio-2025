import { Card } from "../../../components/Card";
import type { Project } from "../../../types/app";
import { useProjects } from "../../../context/ProjectsContext";
import { SlideFadeIn } from "../../../components/SlideFadeIn";

export const Projects = () => {
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <section
        role="region"
        aria-label="Loading projects"
        data-testid="projects-loading"
      >
        <p className="text-white">Loading projects...</p>
      </section>
    );
  }

  return (
    <section
      role="region"
      aria-labelledby="projects-heading"
      data-testid="projects"
      className=""
    >
      <h2 id="projects-heading" className="sr-only">
        Projects Section
      </h2>

      <SlideFadeIn>
        <p
          className="text-white mb-8 md:mb-8 text-sm md:text-base"
          data-testid="projects-intro"
        >
          I maintain my technical skills and experiment with new tools through
          side projects.
        </p>
      </SlideFadeIn>

      <div className="flex justify-center" data-testid="projects-grid-wrapper">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
          data-testid="projects-grid"
        >
          {projects.map((project: Project) => (
            <SlideFadeIn key={project.id}>
              <Card
                title={project.title}
                shortDescription={project.short_description}
                websiteLink={project.website_link ?? ""}
                githubLink={project.github_link ?? ""}
                tags={project.tags ?? []}
                data-testid={`project-card-${project.id}`}
              />
            </SlideFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
