import { RolesCarousel } from "../../components/RolesCarousel";
import SlideFadeIn from "../../components/SlideFadeIn";
import type { Role } from "../../types/app";

const roles: Role[] = [
  {
    id: 1,
    title: "Full Stack Developer III",
    timeframe: "September 2023 - Present",
    description:
      "Back-end developer on an internal web application working with Node.js, Express.js and Mocha. Migrated data from MongoDB to Cassandra database",
    responsibilities: [
      {
        label: "Front End Development",
        value: 20,
      },
      {
        label: "Back End Development",
        value: 15,
      },
      {
        label: "Cloud and DevOps",
        value: 15,
      },
      {
        label: "Technical Program Management",
        value: 25,
      },
      {
        label: "Scrum Master",
        value: 25,
      },
    ],
  },
  {
    id: 2,
    title: "Full Stack Developer II",
    timeframe: "May 2022 - September 2023",
    description:
      "Back-end developer on an internal web application working with Node.js, Express.js and Mocha. Migrated data from MongoDB to Cassandra database",
    responsibilities: [
      {
        label: "Front End Development",
        value: 30,
      },
      {
        label: "Back End Development",
        value: 30,
      },
      {
        label: "Cloud and DevOps",
        value: 40,
      },
    ],
  },
  {
    id: 3,
    title: "Front End Developer",
    timeframe: "June 2020 - May 2022",
    description:
      "Back-end developer on an internal web application working with Node.js, Express.js and Mocha. Migrated data from MongoDB to Cassandra database",
    responsibilities: [
      {
        label: "Front End Development",
        value: 50,
      },
      {
        label: "Back End Development",
        value: 50,
      },
    ],
  },
];

const Work = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-[#1A1A1A]">
      <div className="w-4/5 md:w-2/3 mx-auto">
        <SlideFadeIn>
          <p className="text-white text-sm md:text-base max-w-2xl mb-12 md:mb-16">
            I have worked as a software developer for five years, transitioning
            from a <b>junior front-end developer</b> to a{" "}
            <b>senior full-stack developer </b>
            during this time.
            <br />
            <br />
            As my title has changed so have my responsibilities:
          </p>
        </SlideFadeIn>
        <RolesCarousel roles={roles} />
        {/* <Timeline data={data} /> */}
      </div>
    </section>
  );
};

export default Work;
