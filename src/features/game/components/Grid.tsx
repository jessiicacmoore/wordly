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
    <div>
      {rows.map((row, rowIndex) => {
        const letters = row.padEnd(5).split("");
        const statuses =
          rowIndex < guesses.length
            ? getTileStatuses(guesses[rowIndex], targetWord)
            : Array(5).fill("");

        return (
          <div key={rowIndex}>
            {letters.map((letter, letterIndex) => (
              <div
                key={letterIndex}
                className={`tile ${statuses[letterIndex]}`}
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
