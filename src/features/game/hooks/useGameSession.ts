import { useEffect, useState } from "react";
import { STATUS, type Status } from "../constants";
import type { Game } from "../types";
import { getRandomWord, isGame } from "../utils";

type UseGameSessionReturn = {
  activeGame: Game | null;
  gameStatus: Status;
  hasResumableGame: boolean;
  isGameOver: boolean;
  startNewGame: () => void;
  resumeGame: () => void;
  abandonGame: () => void;
  resetToWelcome: () => void;
  setCurrentGuess: (guess: string) => void;
  setGuesses: (updater: string[] | ((prev: string[]) => string[])) => void;
  setGameStatus: (status: Status) => void;
};

export const useGameSession = (
  storageKey = "wordly-game-session",
): UseGameSessionReturn => {
  const [activeGame, setActiveGame] = useState<Game | null>(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return null;

    try {
      const parsed = JSON.parse(saved);
      return isGame(parsed) ? parsed : null;
    } catch {
      return null;
    }
  });

  const [gameStatus, setGameStatus] = useState<Status>(STATUS.IDLE);

  useEffect(() => {
    if (!activeGame || gameStatus !== "playing") {
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(activeGame));
  }, [activeGame, gameStatus, storageKey]);

  const hasResumableGame = activeGame !== null && gameStatus === STATUS.IDLE;

  const isGameOver = gameStatus === STATUS.WON || gameStatus === STATUS.LOST;

  const startNewGame = () => {
    const newGame: Game = {
      targetWord: getRandomWord(),
      guesses: [],
      currentGuess: "",
    };

    setActiveGame(newGame);
    setGameStatus(STATUS.PLAYING);
    localStorage.setItem(storageKey, JSON.stringify(newGame));
  };

  const resumeGame = () => {
    if (!activeGame) return;
    setGameStatus(STATUS.PLAYING);
  };

  const abandonGame = () => {
    setActiveGame(null);
    setGameStatus(STATUS.IDLE);
    localStorage.removeItem(storageKey);
  };

  const resetToWelcome = () => {
    setGameStatus(STATUS.IDLE);
  };

  const setCurrentGuess = (guess: string) => {
    setActiveGame((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        currentGuess: guess,
      };
    });
  };

  const setGuesses = (updater: string[] | ((prev: string[]) => string[])) => {
    setActiveGame((prev) => {
      if (!prev) return prev;

      const nextGuesses =
        typeof updater === "function" ? updater(prev.guesses) : updater;

      return {
        ...prev,
        guesses: nextGuesses,
      };
    });
  };

  return {
    activeGame,
    gameStatus,
    hasResumableGame,
    isGameOver,
    startNewGame,
    resumeGame,
    abandonGame,
    resetToWelcome,
    setCurrentGuess,
    setGuesses,
    setGameStatus,
  };
};
