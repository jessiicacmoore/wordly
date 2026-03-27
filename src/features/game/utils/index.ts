import { WORDS } from "../constants";
import type { Game } from "../types";

export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};

export const isGame = (value: unknown): value is Game => {
  if (!value || typeof value !== "object") return false;

  const game = value as Game;

  return (
    typeof game.targetWord === "string" &&
    Array.isArray(game.guesses) &&
    game.guesses.every((guess) => typeof guess === "string") &&
    typeof game.currentGuess === "string"
  );
};
