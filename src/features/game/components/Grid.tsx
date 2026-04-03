import { getTileStatuses } from "../utils";

type GridProps = {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
};

export const Grid = ({ guesses, currentGuess, targetWord }: GridProps) => {
  const rows = Array.from({ length: 6 }, (_, i) => {
    if (i < guesses.length) return guesses[i];

    if (i === guesses.length) return currentGuess;

    return "";
  });

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, rowIndex) => {
        const letters = row.padEnd(5).split("");
        const statuses =
          rowIndex < guesses.length
            ? getTileStatuses(guesses[rowIndex], targetWord)
            : Array(5).fill("");

        return (
          <div key={rowIndex} className="flex gap-3">
            {letters.map((letter, letterIndex) => (
              <div
                key={letterIndex}
                className={`tile ${statuses[letterIndex]} flex h-14 w-14 items-center justify-center border text-lg font-bold uppercase`}
              >
                {letter}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
