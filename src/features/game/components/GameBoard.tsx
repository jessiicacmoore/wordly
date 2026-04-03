import { useEffect } from "react";
import type { Game } from "../types";
import { Grid } from "./Grid";
import { Keyboard } from "./Keyboard";
import { getKeyboardStatuses } from "../utils";
import { GameToast } from "./GameToast";

type GameBoardProps = {
  game: Game;
  feedbackMessage: string | null;
  onKeyInput: (input: string) => void;
};

export const GameBoard = ({
  game,
  feedbackMessage,
  onKeyInput,
}: GameBoardProps) => {
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
    <div className="relative flex flex-col items-center gap-6">
      <div className="pointer-events-none absolute top-2 left-1/2 z-10 -translate-x-1/2">
        <GameToast message={feedbackMessage} />
      </div>
      <Grid game={game} />
      <Keyboard onKeyPress={onKeyInput} keyStatuses={keyStatuses} />
    </div>
  );
};
