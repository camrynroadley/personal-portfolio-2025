import { useEffect, useState } from "react";
import { RolesCarousel } from "../../../components/RolesCarousel";
import { useRoles } from "../../../context/RolesContext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { colors } from "../../../constants";
import { Role } from "../../../types/app";

export const Work = () => {
  const { roles, loading } = useRoles();
  const [sortedRoles, setSortedRoles] = useState<Role[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const role = sortedRoles[selectedIndex] || null;

  const prev = () => {
    setSelectedIndex((i) => (i === 0 ? sortedRoles.length - 1 : i - 1));
  };

  const next = () => {
    setSelectedIndex((i) => (i === sortedRoles.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    if (!loading && roles.length > 0) {
      const sorted = [...roles].sort((a, b) => a.id - b.id);
      setSortedRoles(sorted);

      const indexOfId1 = sorted.findIndex((r) => r.id === 1);
      setSelectedIndex(indexOfId1 >= 0 ? indexOfId1 : 0);
    }
  }, [loading, roles]);

  if (loading) {
    return (
      <section
        role="region"
        aria-label="Loading work experience"
        data-testid="work-loading"
      >
        <p className="text-white">Loading roles...</p>
      </section>
    );
  }

  return (
    <section
      className="text-white"
      role="region"
      aria-labelledby="work-heading"
      data-testid="work"
    >
      <h2 id="work-heading" className="sr-only">
        Work Experience Section
      </h2>

      <div
        className="grid grid-cols-4 gap-4 items-start mb-8"
        data-testid="work-intro"
      >
        <p className="col-span-3 text-sm md:text-base max-w-2xl">
          I have worked as a software developer for five years, transitioning
          from a <b>junior full-stack developer</b> to a{" "}
          <b>senior full-stack developer</b> during this time.
        </p>

        <div
          className="col-span-1 flex justify-end items-start space-x-2"
          data-testid="role-navigation"
        >
          <button
            onClick={prev}
            style={{ backgroundColor: colors.DARK_GRAY }}
            className="text-white w-10 aspect-square rounded-full shadow-md flex items-center justify-center transition-all hover:cursor-pointer"
            aria-label="Previous role"
            data-testid="prev-role-button"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>
          <button
            onClick={next}
            style={{ backgroundColor: colors.DARK_GRAY }}
            className="text-white w-10 aspect-square rounded-full shadow-md flex items-center justify-center transition-all hover:cursor-pointer"
            aria-label="Next role"
            data-testid="next-role-button"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>
      <div data-testid="role-carousel">
        {role && <RolesCarousel role={role} />}
      </div>
    </section>
  );
};
