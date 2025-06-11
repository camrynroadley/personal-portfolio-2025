import React, { useState } from "react";
import type { Role } from "../types/app";
import PieAnimation, { CustomLegend } from "./PieChart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const RolesCarousel = ({ roles }: { roles: Role[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const role = roles[selectedIndex];

  const prev = () => {
    setSelectedIndex((i) => (i === 0 ? roles.length - 1 : i - 1));
  };

  const next = () => {
    setSelectedIndex((i) => (i === roles.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 text-white">
        {role.responsibilities && (
          <PieAnimation responsibilities={role.responsibilities} />
        )}
        <div className="flex flex-col space-y-3">
          <p className="text-base">{role.timeframe}</p>
          <p className="text-2xl md:text-4xl">{role.title}</p>
          <p className="text-base">{role.description}</p>
          {role.responsibilities && (
            <CustomLegend responsibilities={role.responsibilities} />
          )}
          <div className="mt-4 flex space-x-1">
            <button
              onClick={prev}
              aria-label="Previous role"
              className="flex items-center justify-center hover:cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              <ChevronLeftIcon fontSize="large" />
            </button>
            <button
              onClick={next}
              aria-label="Next role"
              className="flex items-center justify-center hover:cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              <ChevronRightIcon fontSize="large" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
