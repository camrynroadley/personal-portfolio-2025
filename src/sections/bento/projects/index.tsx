import Card from "../../../components/Card";
import type { Project } from "../../../types/app";
import { useProjects } from "../../../context/ProjectsContext";
import SlideFadeIn from "../../../components/SlideFadeIn";

const Projects = () => {
  const { projects, loading } = useProjects();
  if (loading) return <p>Loading projects...</p>;

  return (
    <section className="">
      <SlideFadeIn>
        <p className="text-white mb-12 md:mb-8 text-base">
          I maintain my technical skills and experiment with new tools through
          side projects.
        </p>
      </SlideFadeIn>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {projects.map((project: Project, index) => {
            return (
              <SlideFadeIn key={project.id}>
                <Card
                  slug={project.slug}
                  title={project.title}
                  shortDescription={project.short_description}
                  websiteLink={project.website_link ?? ""}
                  githubLink={project.github_link ?? ""}
                  tags={project.tags ?? []}
                  index={index}
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
