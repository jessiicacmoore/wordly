import { useEffect } from "react";
import type { Game } from "../types";
import { Grid } from "./Grid";

type GameBoardProps = {
  game: Game;
  onKeyInput: (input: string) => void;
};

export const GameBoard = ({ game, onKeyInput }: GameBoardProps) => {
  const { targetWord, guesses, currentGuess } = game;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      onKeyInput(event.key);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyInput]);

  return (
    <div className="flex flex-col items-center gap-6">
      <p>Target word: {targetWord}</p>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        targetWord={targetWord}
      />
    </div>
  );
};
