import type { TileStatus } from "../constants";
import type { Game } from "../types";
import { buildGridRows, getTileStatuses } from "../utils";
import { GridRow } from "./GridRow";

type GridProps = {
  game: Game;
};

const EMPTY_ROW_STATUSES: TileStatus[] = Array(5).fill("");

export const Grid = ({ game }: GridProps) => {
  const { guesses, currentGuess, targetWord } = game;
  const rows = buildGridRows(guesses, currentGuess);

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, rowIndex) => {
        const statuses =
          rowIndex < guesses.length
            ? getTileStatuses(row, targetWord)
            : EMPTY_ROW_STATUSES;

        return <GridRow key={rowIndex} row={row} statuses={statuses} />;
      })}
    </div>
  );
};
