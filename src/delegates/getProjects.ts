import { supabase } from '../supabase/client';
import type { Project } from '../types/app';

export const getProjects = async () => {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error("Error fetching projects:", error);
  }
   return data as Project[];
};
