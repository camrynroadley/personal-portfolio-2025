"use client";
import { useState } from "react";
import Card from "../../components/Card";
import type { Project } from "../../types/app";
import { useProjects } from "../../context/ProjectsContext";

interface ProjectsProps {
  handleCardClicked: (slug: string) => void;
}

const Projects = ({ handleCardClicked }: ProjectsProps) => {
  const [showModal, setShowModal] = useState(false);
  const { projects, loading } = useProjects();
  console.log("*** projects: ", projects);
  if (loading) return <p>Loading projects...</p>;

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="w-4/5 md:w-2/3 mx-auto">
          <p className="text-white mb-12 md:mb-16">
            I maintain my technical skills and experiment with new tools through
            side projects.
          </p>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {projects.map((project: Project) => {
              return (
                <Card
                  key={project.id}
                  slug={project.slug}
                  title={project.title}
                  shortDescription={project.short_description}
                  websiteLink={project.website_link ?? ""}
                  githubLink={project.github_link ?? ""}
                  tags={project.tags ?? []}
                  handleCardClicked={() =>
                    handleCardClicked(String(project.slug))
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
