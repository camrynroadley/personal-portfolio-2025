import ReactMarkdown from "react-markdown";
import { StaticTag } from "./StaticTag";
import { LinkWithArrow } from "./LinkWithArrow";

interface CardProps {
  title: string;
  shortDescription: string;
  websiteLink: string;
  githubLink: string;
  tags: string[];
}

export const Card = ({
  title,
  shortDescription,
  websiteLink,
  githubLink,
  tags,
}: CardProps) => {
  const headingId = `card-title-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <article
      className="block w-full rounded-2xl overflow-hidden shadow-lg tracking-tight h-full flex flex-col"
      role="article"
      aria-labelledby={headingId}
      data-testid={`project-card-${headingId}`}
    >
      <div className="bg-[#262626] p-6 flex flex-col flex-grow">
        {/* Tags */}
        <div
          className="flex flex-col md:flex-row md:space-x-1 space-y-1 md:space-y-0 items-start mb-4"
          data-testid="card-tags"
        >
          {tags.map((tag, i) => (
            <StaticTag key={i} text={tag} />
          ))}
        </div>

        {/* Title */}
        <h3
          id={headingId}
          className="text-3xl text-white mb-2 text-left font-medium"
          data-testid="card-title"
        >
          {title}
        </h3>

        {/* Description */}
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

        {/* Links */}
        <div
          className="flex space-x-2 text-gray-300 font-medium text-sm mt-auto"
          data-testid="card-links"
        >
          {websiteLink && (
            <LinkWithArrow
              href={websiteLink}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${title} website`}
              data-testid="card-link-website"
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
              data-testid="card-link-github"
            >
              GitHub
            </LinkWithArrow>
          )}
        </div>
      </div>
    </article>
  );
};
