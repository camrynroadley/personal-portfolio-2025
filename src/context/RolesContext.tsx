import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getRoles } from '../delegates/getRoles';
import type { Role } from '../types/app';

interface RolesContextType {
  roles: Role[];
  loading: boolean;
  refreshRoles: () => void;
}

const RolesContext = createContext<RolesContextType | undefined>(undefined);

export const RolesProvider = ({ children }: { children: ReactNode }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    setLoading(true);
    const data = await getRoles();
    if (data) {
      setRoles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <RolesContext.Provider value={{ roles, loading, refreshRoles: fetchRoles }}>
      {children}
    </RolesContext.Provider>
  );
};

// Custom hook
export const useRoles = () => {
  const context = useContext(RolesContext);
  if (!context) throw new Error("useRoles must be used within a RolesProvider");
  return context;
};
