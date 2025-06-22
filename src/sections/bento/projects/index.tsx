import { Card } from "../../../components/Card";
import type { Project } from "../../../types/app";
import { useProjects } from "../../../context/ProjectsContext";
import { SlideFadeIn } from "../../../components/SlideFadeIn";

const Projects = () => {
  const { projects, loading } = useProjects();
  if (loading) return <p>Loading projects...</p>;

  return (
    <section className="">
      <SlideFadeIn>
        <p className="text-white mb-8 md:mb-8 text-sm md:text-base">
          I maintain my technical skills and experiment with new tools through
          side projects.
        </p>
      </SlideFadeIn>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {projects.map((project: Project) => {
            return (
              <SlideFadeIn key={project.id}>
                <Card
                  title={project.title}
                  shortDescription={project.short_description}
                  websiteLink={project.website_link ?? ""}
                  githubLink={project.github_link ?? ""}
                  tags={project.tags ?? []}
                />
              </SlideFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
