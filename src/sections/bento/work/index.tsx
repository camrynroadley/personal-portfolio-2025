import { useState } from "react";
import { RolesCarousel } from "../../../components/RolesCarousel";
import { useRoles } from "../../../context/RolesContext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Work = () => {
  const { roles, loading } = useRoles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const role = roles[selectedIndex];

  const prev = () => {
    setSelectedIndex((i) => (i === 0 ? roles.length - 1 : i - 1));
  };

  const next = () => {
    setSelectedIndex((i) => (i === roles.length - 1 ? 0 : i + 1));
  };
  if (loading) return <p>Loading roles...</p>;

  return (
    <section className="text-white">
      <div className="grid grid-cols-4 gap-4 items-start mb-8">
        <p className="col-span-3 text-sm md:text-base max-w-2xl">
          I have worked as a software developer for five years, transitioning
          from a <b>junior front-end developer</b> to a{" "}
          <b>senior full-stack developer </b>
          during this time.
        </p>
        <div className="col-span-1 flex justify-end items-start space-x-2">
          <button
            onClick={prev}
            className="bg-[#2D2D2D] hover:bg-gray-600 text-white w-10 aspect-square rounded-full shadow-md flex items-center justify-center transition-all hover:cursor-pointer"
            aria-label="Previous role"
          >
            <ChevronLeftIcon fontSize="small" />
          </button>
          <button
            onClick={next}
            className="bg-[#2D2D2D] hover:bg-gray-600 text-white w-10 aspect-square rounded-full shadow-md flex items-center justify-center transition-all hover:cursor-pointer"
            aria-label="Next role"
          >
            <ChevronRightIcon fontSize="small" />
          </button>
        </div>
      </div>

      <RolesCarousel role={role} />
    </section>
  );
};

export default Work;
