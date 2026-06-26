interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === "center" ? "text-center mx-auto" : "text-left"} max-w-2xl ${className}`}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-display text-3xl md:text-5xl font-medium text-text-primary leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-text-muted text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
