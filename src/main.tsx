import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProjectsProvider } from "./context/ProjectsContext.tsx";
import { RolesProvider } from "./context/RolesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProjectsProvider>
      <RolesProvider>
        <App />
      </RolesProvider>
    </ProjectsProvider>
  </StrictMode>
);
