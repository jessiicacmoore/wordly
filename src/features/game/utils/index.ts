import { TILE_STATUS, WORDS, ACTIONS, type TileStatus } from "../constants";
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

type KeyAction =
  | { type: typeof ACTIONS.ADD; value: string }
  | { type: typeof ACTIONS.DELETE; value: string }
  | { type: typeof ACTIONS.SUBMIT }
  | { type: typeof ACTIONS.NOOP };

type GetKeyActionParams = {
  input: string;
  currentGuess: string;
  maxLength?: number;
};

export const getKeyAction = ({
  input,
  currentGuess,
  maxLength = 5,
}: GetKeyActionParams): KeyAction => {
  const key = input.toLowerCase();

  if (/^[a-z]$/.test(key)) {
    if (currentGuess.length < maxLength) {
      return {
        type: ACTIONS.ADD,
        value: currentGuess + key,
      };
    }

    return { type: ACTIONS.NOOP };
  }

  if (key === "backspace") {
    return {
      type: ACTIONS.DELETE,
      value: currentGuess.slice(0, -1),
    };
  }

  if (key === "enter" && currentGuess.length === maxLength) {
    return { type: ACTIONS.SUBMIT };
  }

  return { type: ACTIONS.NOOP };
};

export const getTileStatuses = (
  guess: string,
  target: string,
): TileStatus[] => {
  const result: TileStatus[] = Array(guess.length).fill(TILE_STATUS.ABSENT);
  const targetLetters = target.split("");

  // First pass: exact matches
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      result[i] = TILE_STATUS.CORRECT;
      targetLetters[i] = "";
    }
  }

  // Second pass: wrong position matches
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === TILE_STATUS.CORRECT) continue;

    const index = targetLetters.indexOf(guess[i]);
    if (index !== -1) {
      result[i] = TILE_STATUS.PRESENT;
      targetLetters[index] = "";
    }
  }

  return result;
};
