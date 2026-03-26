import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks";
import { THEME } from "../constants";
import { cn } from "@/utils";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === THEME.LIGHT;
  const label = isLight ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={!isLight}
      className={cn(
        "focus:ring-accent relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none",
        isLight ? "bg-light-gray" : "bg-accent",
      )}
    >
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full bg-white transition-transform",
          isLight ? "translate-x-1" : "translate-x-6",
        )}
      >
        {isLight ? (
          <Sun className="h-3 w-3 text-yellow-500" />
        ) : (
          <Moon className="text-accent h-3 w-3" />
        )}
      </span>
    </button>
  );
};
