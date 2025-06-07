import React from "react";
import Tag from "./Tag";
import LinkWithArrow from "./LinkWithArrow";

interface CardProps {
  slug: string;
  title: string;
  shortDescription: string;
  websiteLink: string;
  githubLink: string;
  tags: string[];
  handleCardClicked: (id: string) => void;
}

const Card = ({
  slug,
  title,
  shortDescription,
  websiteLink,
  githubLink,
  tags,
  handleCardClicked,
}: CardProps) => {
  return (
    <button
      onClick={() => handleCardClicked(slug)}
      className="block w-full max-w-sm rounded-2xl overflow-hidden shadow-lg tracking-tight h-full flex flex-col transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
    >
      {/* Top banner */}
      <div className="relative h-50 bg-gradient-to-r from-pink-600 via-orange-300 to-lime-700 animate-gradient bg-[length:400%_400%]">
        <div className="flex flex-row absolute left-4 top-4 gap-1">
          <Tag text="Web Design" className="text-xs" />
          <Tag text="Web Development" className="text-xs" />
        </div>
      </div>

      {/* Bottom content */}
      <div className="bg-white p-6 flex flex-col flex-grow">
        <h3 className="text-3xl text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 mb-4 flex-grow">{shortDescription}</p>

        <div className="flex space-x-4 text-blue-600 font-medium text-sm mt-auto">
          <LinkWithArrow
            href={websiteLink}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </LinkWithArrow>
          <LinkWithArrow
            href={githubLink}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </LinkWithArrow>
        </div>
      </div>
    </button>
  );
};

export default Card;
