import { StaticTag } from "../../../components/StaticTag";

export const About = () => {
  return (
    <section
      className="w-full text-white space-y-8"
      role="region"
      aria-label="About Sidebar Information"
      data-testid="about"
    >
      {/* Location */}
      <section
        aria-labelledby="about-location-heading"
        role="region"
        data-testid="about-location"
      >
        <h3
          id="about-location-heading"
          className="text-sm mb-2 font-semibold text-gray-300"
        >
          LOCATION
        </h3>
        <ul className="space-y-1 text-lg/6">
          <li>Vancouver, BC</li>
        </ul>
      </section>

      {/* Socials */}
      <section
        aria-labelledby="about-socials-heading"
        role="region"
        data-testid="about-socials"
      >
        <h3
          id="about-socials-heading"
          className="text-sm mb-2 font-semibold text-gray-300"
        >
          SOCIALS
        </h3>
        <ul className="space-y-1 text-lg/6">
          <li>
            <a
              href="https://www.linkedin.com/in/camrynroadley"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://github.com/camrynroadley"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label="Personal GitHub profile (opens in a new tab)"
            >
              GitHub <StaticTag text="Personal" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/croadley"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label="Professional GitHub profile (opens in a new tab)"
            >
              GitHub <StaticTag text="Professional" />
            </a>
          </li>
        </ul>
      </section>

      {/* Skills */}
      <section
        aria-labelledby="about-skills-heading"
        role="region"
        data-testid="about-skills"
      >
        <h3
          id="about-skills-heading"
          className="text-sm mb-2 font-semibold text-gray-300"
        >
          WHAT I DO
        </h3>
        <ul className="space-y-1 text-lg/6">
          <li>Web Design</li>
          <li>Web Development</li>
          <li>Product Management</li>
          <li>Technical Program Management</li>
        </ul>
      </section>
    </section>
  );
};
