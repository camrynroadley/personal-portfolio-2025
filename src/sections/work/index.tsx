import { Timeline } from "../../components/Timeline";

const data = [
  {
    title: "Senior Full Stack Developer",
    description: "Back-end developer on an internal web application working with Node.js, Express.js and Mocha. Migrated data from MongoDB to Cassandra database",
  },
  {
    title: "Full Stack Developer III",
    description:  "Back-end developer on an internal web application working with Node.js, Express.js and Mocha. Migrated data from MongoDB to Cassandra database",
  },
  {
    title: "Full Stack Developer II",
    description:  "Back-end developer on an internal web application working with Node.js, Express.js and Mocha. Migrated data from MongoDB to Cassandra database",
  },
  {
    title: "Front End Developer",
    description:  "Back-end developer on an internal web application working with Node.js, Express.js and Mocha. Migrated data from MongoDB to Cassandra database",
  },
];

const Work = () => {
  return (
    <div className="w-4/5 mx-auto">
      <p className="text-white text-sm md:text-base max-w-2xl">
        I have worked as a software developer for five years, transitioning from a junior front-end developer to a senior full-stack developer during this time.
      </p>
      <Timeline data={data} />
    </div>
  );
};

export default Work;
