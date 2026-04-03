import { cn } from "@/utils";
import type { TileStatus } from "../constants";

type GridRowProps = {
  row: string;
  statuses: TileStatus[];
};

export const GridRow = ({ row, statuses }: GridRowProps) => {
  const letters = row.padEnd(5).split("");

  return (
    <div className="flex gap-2">
      {letters.map((letter, letterIndex) => (
        <div
          key={letterIndex}
          className={cn(
            "tile flex h-14 w-14 items-center justify-center border text-lg font-bold uppercase",
            statuses[letterIndex],
          )}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};
