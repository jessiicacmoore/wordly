import { cn } from "@/utils";
import type { KeyStatus } from "../constants";

type KeyboardKeyProps = {
  value: string;
  status?: KeyStatus;
  onPress: (key: string) => void;
};

export const KeyboardKey = ({ value, status, onPress }: KeyboardKeyProps) => {
  const isEnter = value === "Enter";
  const isBackspace = value === "Backspace";
  
  const isWide = isEnter || isBackspace;

  return (
    <button
      type="button"
      onClick={() => onPress(value)}
      className={cn(
        "keycap",
        isWide ? "min-w-[3.2rem] md:min-w-18" : "w-8 md:w-10",
        status,
      )}
      aria-label={isBackspace ? "Delete letter" : value}
    >
      {isBackspace ? "⌫" : value}
    </button>
  );
};
