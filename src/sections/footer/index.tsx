import Tag from "../../components/Tag";

const Footer = () => {
  return (
      <section className="w-4/5 mx-auto bg-[#FE7FA2] rounded-3xl py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
          <div>
            <h3 className="text-sm mb-2">WHAT I DO</h3>
            <ul className="">
              <li>Web Design</li>
              <li>Web Development</li>
              <li>Product Management</li>
              <li>Technical Program Management</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm mb-2">SOCIALS</h3>
            <ul className="">
              <li>LinkedIn</li>
              <li>
                {`GitHub `}
                <Tag text="Professional" className="text-xs" />
              </li>
              <li>
                {`GitHub `}
                <Tag text="Personal" className="text-xs" />
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm mb-2">LANGUAGES</h3>
            <ul className="">
              <li>English</li>
              <li>French</li>
            </ul>
          </div>
        </div>
      </section>
  );
};

export default Footer;
