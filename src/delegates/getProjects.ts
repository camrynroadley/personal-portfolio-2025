export const getProjects = async () => {
  const { supabase } = await import("../supabase/client");
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
};
