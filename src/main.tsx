/* istanbul ignore file */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProjectsProvider } from "./context/ProjectsContext";
import { RolesProvider } from "./context/RolesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProjectsProvider>
      <RolesProvider>
        <App />
      </RolesProvider>
    </ProjectsProvider>
  </StrictMode>
);
