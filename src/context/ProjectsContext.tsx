import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getProjects } from '../delegates/getProjects';
import type { Project } from '../types/app';

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  refreshProjects: () => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    if (data) {
      setProjects(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading, refreshProjects: fetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

// Custom hook
export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error("useProjects must be used within a ProjectsProvider");
  return context;
};
