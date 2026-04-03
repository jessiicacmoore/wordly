import { cn } from "@/utils";
import React from "react";

const buttonStyles = {
  primary: [
    "bg-button-primary",
    "text-button-primary-text",
    "hover:bg-button-primary-hover",
    "shadow-sm",
  ].join(" "),
  secondary: [
    "border",
    "border-button-secondary-border",
    "bg-button-secondary",
    "text-button-secondary-text",
    "hover:bg-button-secondary-hover",
    "shadow-sm",
  ].join(" "),
} as const;

type ButtonProps = {
  variant?: keyof typeof buttonStyles;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, ...rest }, ref) => {
    const buttonClasses = cn(
      "inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2.5",
      "font-semibold",
      "transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
      "focus-visible:ring-offset-bg",
      "disabled:pointer-events-none disabled:opacity-50",
      buttonStyles[variant],
      className,
    );

    return (
      <button ref={ref} className={buttonClasses} {...rest}>
        {children}
      </button>
    );
  },
);
