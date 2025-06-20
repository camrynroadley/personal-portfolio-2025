import { StaticTag } from "../../../components/StaticTag";

export const About = () => {
  return (
    <div className="w-full text-white space-y-8">
      <div className="">
        <h3 className="text-sm mb-2 font-semibold text-gray-300">WHAT I DO</h3>
        <ul className="space-y-1 text-lg/6">
          <li>Web Design</li>
          <li>Web Development</li>
          <li>Product Management</li>
          <li>Technical Program Management</li>
        </ul>
      </div>

      <div className="">
        <h3 className="text-sm mb-2 font-semibold text-gray-300">SOCIALS</h3>
        <ul className="space-y-1 text-lg/6">
          <li>
            <a
              href="https://www.linkedin.com/in/camrynroadley"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
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
            >
              GitHub <StaticTag text="Professional" />
            </a>
          </li>
        </ul>
      </div>

      <div className="">
        <h3 className="text-sm mb-2 font-semibold text-gray-300">LANGUAGES</h3>
        <ul className="space-y-1 text-lg/6">
          <li>English</li>
          <li>French</li>
        </ul>
      </div>
    </div>
  );
};
