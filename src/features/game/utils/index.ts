import {
  TILE_STATUS,
  GAME_WORDS,
  ACTIONS,
  type TileStatus,
  type KeyStatus,
  KEY_STATUS_PRIORITY,
  WORDS,
} from "../constants";
import type { Game } from "../types";

export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * GAME_WORDS.length);
  return GAME_WORDS[randomIndex];
};

export const isValidWord = (word: string): boolean => {
  return WORDS.includes(word.toLowerCase());
}

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
  if (guess.length !== target.length) {
    return Array(guess.length).fill(TILE_STATUS.ABSENT);
  }

  const result: TileStatus[] = Array(guess.length).fill(TILE_STATUS.ABSENT);
  const targetLetters = target.split("");

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      result[i] = TILE_STATUS.CORRECT;
      targetLetters[i] = "";
    }
  }

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

type GuessLetterResult = {
  letter: string;
  status: KeyStatus;
};

export const getGuessLetterResults = (
  guess: string,
  target: string,
): GuessLetterResult[] => {
  const statuses = getTileStatuses(guess, target);

  return guess.split("").map((letter, index) => ({
    letter: letter.toLowerCase(),
    status: statuses[index] as KeyStatus,
  }));
};

export const getKeyboardStatuses = (
  guesses: string[],
  target: string,
): Partial<Record<string, KeyStatus>> => {
  return guesses.reduce<Partial<Record<string, KeyStatus>>>((acc, guess) => {
    const results = getGuessLetterResults(guess, target);

    results.forEach(({ letter, status }) => {
      const currentStatus = acc[letter];

      if (
        !currentStatus ||
        KEY_STATUS_PRIORITY[status] > KEY_STATUS_PRIORITY[currentStatus]
      ) {
        acc[letter] = status;
      }
    });

    return acc;
  }, {});
};

export const buildGridRows = (
  guesses: string[],
  currentGuess: string,
  maxRows = 6,
): string[] => {
  return Array.from({ length: maxRows }, (_, index) => {
    if (index < guesses.length) return guesses[index];
    if (index === guesses.length) return currentGuess;
    return "";
  });
};
