import ReactMarkdown from "react-markdown";
import "./styles.css";
import { StaticTag } from "./StaticTag";
import LinkWithArrow from "./LinkWithArrow";

interface CardProps {
  title: string;
  shortDescription: string;
  websiteLink: string;
  githubLink: string;
  tags: string[];
}

const Card = ({
  title,
  shortDescription,
  websiteLink,
  githubLink,
  tags,
}: CardProps) => {


  return (
    // <button
    //   onClick={() => handleCardClicked(slug)}
    //   className="block w-full max-w-sm rounded-2xl overflow-hidden shadow-lg tracking-tight h-full flex flex-col transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
    // >
    <div className="block w-full rounded-2xl overflow-hidden shadow-lg tracking-tight h-full flex flex-col">
      {/* Top banner */}
      {/* <div className={gradientClassNames[index]}>
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <StaticTag key={i} text={tag} />
          ))}
        </div>
      </div> */}
      <div className="bg-[#262626] p-6 flex flex-col flex-grow">
        <div className="flex flex-col md:flex-row md:space-x-1 space-y-1 md:space-y-0 items-start mb-4">
          {tags.map((tag, i) => (
            <StaticTag key={i} text={tag} />
          ))}
        </div>

        <h3 className="text-3xl text-white mb-2 text-left font-medium">
          {title}
        </h3>
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p className="text-base text-gray-300 mb-4 flex-grow text-left leading-relaxed">
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
          }}
        >
          {shortDescription}
        </ReactMarkdown>
        <div className="flex space-x-2 text-gray-300 font-medium text-sm mt-auto">
          {websiteLink && (
            <LinkWithArrow
              href={websiteLink}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${title} website`}
            >
              Website
            </LinkWithArrow>
          )}
          {githubLink && (
            <LinkWithArrow
              href={githubLink}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} on GitHub`}
            >
              GitHub
            </LinkWithArrow>
          )}
        </div>
      </div>
    </div>
    // </button>
  );
};

export default Card;
