interface StaticTagProps {
  text: string;
}

export const StaticTag = ({ text }: StaticTagProps) => {
  return (
    <div
      className="inline-flex items-center rounded"
      role="note"
      aria-label={`Tag: ${text}`}
      data-testid={`static-tag-${text.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="bg-white rounded px-2 border border-black font-bold text-xs uppercase tracking-tighter shadow text-black">
        {text}
      </div>
    </div>
  );
};
