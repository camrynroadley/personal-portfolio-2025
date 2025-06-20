import { supabase } from '../supabase/client';
import type { Role } from '../types/app';

export const getRoles = async () => {
  const { data, error } = await supabase.from("roles").select("*");

  if (error) {
    console.error("Error fetching projects:", error);
  }
   return data as Role[];
};
