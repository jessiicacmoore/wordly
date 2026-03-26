import { cn } from "@/utils";
import type { ComponentProps } from "react";

type ContainerProps = ComponentProps<"div">;

export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  const containerClassNames = cn(
    "mx-auto w-full max-w-5xl px-4 sm:px-6",
    className,
  );

  return (
    <div className={containerClassNames} {...props}>
      {children}
    </div>
  );
};
