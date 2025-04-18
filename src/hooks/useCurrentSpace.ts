
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

type Space = {
  name: string;
  routes: string[];
};

const spaces: Space[] = [
  {
    name: "Main Menu Space",
    routes: ["/dashboard", "/devices", "/reports"]
  },
  {
    name: "Bulk Maintenance Space",
    routes: ["/download-data", "/download-history", "/upload-data", "/submit"]
  },
  {
    name: "User Guidance Space",
    routes: ["/getting-started", "/whats-new", "/user-guide"]
  },
  {
    name: "User Settings Space",
    routes: ["/profile", "/settings", "/trust-center"]
  }
];

export const useCurrentSpace = () => {
  const location = useLocation();
  
  const currentSpace = useMemo(() => {
    const space = spaces.find(space => 
      space.routes.some(route => location.pathname === route)
    );
    return space?.name || "Bulk Processing Space";
  }, [location.pathname]);

  return currentSpace;
};
