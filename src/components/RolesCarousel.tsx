import type { Role } from "../types/app";
import PieAnimation, { CustomLegend } from "./PieChart";
import { StaticTag } from "./StaticTag";

interface RolesCarouselProps {
  role: Role;
}
export const RolesCarousel = ({ role }: RolesCarouselProps) => {
  return (
    <div className="relative w-full overflow-visible">
      <div className="relative bg-[#2D2D2D] w-full rounded-xl shadow-lg px-4 py-8 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-3 relative space-y-8 lg:space-y-0">
          {role.responsibilities && (
            <div className="col-span-1 flex justify-center items-center">
              <div className="relative z-20 w-full max-w-[300px] px-4">
                <PieAnimation responsibilities={role.responsibilities} />
              </div>
            </div>
          )}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-3 px-4 md:px-8">
            {role.isCurrentRole && <StaticTag text="Current Role" />}
            <div className="flex flex-col lg:flex-row space-x-2">
              <p className="text-sm text-gray-300">{role.company}</p>
              <p className="text-sm text-gray-300 hidden lg:inline">●</p>
              <p className="text-sm text-gray-300">{role.timeframe}</p>
            </div>
            <p className="text-3xl font-medium text-white">{role.title}</p>
            <p className="text-base text-gray-300">{role.description}</p>
            {role.responsibilities && (
              <CustomLegend responsibilities={role.responsibilities} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
