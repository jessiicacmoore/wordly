import React from "react";
import { cn } from "@/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  level: HeadingLevel;
  visualLevel?: HeadingLevel;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

const headingStyles: Record<HeadingLevel, string> = {
  1: "text-4xl font-semibold leading-tight mb-4",
  2: "text-3xl font-semibold leading-snug mb-3",
  3: "text-2xl font-medium leading-snug mb-2",
  4: "text-xl font-medium leading-normal mb-2",
  5: "text-base font-medium leading-normal text-secondary mb-1",
  6: "text-sm font-medium leading-normal tracking-wide text-secondary mb-1",
};

export const Heading = ({
  level,
  visualLevel,
  className = "",
  children,
  ...rest
}: HeadingProps) => {
  const Tag = `h${level}` as const;
  const styleLevel = visualLevel ?? level;
  const styles = headingStyles[styleLevel];

  const headingClasses = cn(styles, className);

  return (
    <Tag className={headingClasses} {...rest}>
      {children}
    </Tag>
  );
};
