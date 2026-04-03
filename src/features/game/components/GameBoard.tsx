import { useEffect } from "react";
import type { Game } from "../types";
import { Grid } from "./Grid";
import { Keyboard } from "./Keyboard";
import { getKeyboardStatuses } from "../utils";

type GameBoardProps = {
  game: Game;
  onKeyInput: (input: string) => void;
};

export const GameBoard = ({ game, onKeyInput }: GameBoardProps) => {
  const { targetWord, guesses } = game;
  const keyStatuses = getKeyboardStatuses(guesses, targetWord);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.isComposing) return;

      const target = event.target as HTMLElement;
      if (["BUTTON", "INPUT", "A"].includes(target.tagName)) {
        return;
      }

      onKeyInput(event.key);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyInput]);

  return (
    <div className="flex flex-col items-center gap-6">
      <p>Target word: {targetWord}</p>
      <Grid game={game} />
      <Keyboard onKeyPress={onKeyInput} keyStatuses={keyStatuses} />
    </div>
  );
};
