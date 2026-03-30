import { useCallback, useEffect, useState } from "react";
import { ACTIONS, STATUS, type Status } from "../constants";
import type { Game } from "../types";
import { getKeyAction, getRandomWord, isGame } from "../utils";

type UseGameSessionReturn = {
  activeGame: Game | null;
  gameStatus: Status;
  hasResumableGame: boolean;
  isGameOver: boolean;
  startNewGame: () => void;
  resumeGame: () => void;
  abandonGame: () => void;
  handleKeyInput: (input: string) => void;
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

  const submitGuess = useCallback(() => {
    setActiveGame((prev) => {
      if (!prev) return prev;
      if (prev.currentGuess.length !== prev.targetWord.length) return prev;

      const nextGuesses = [...prev.guesses, prev.currentGuess];
      const didWin = prev.currentGuess === prev.targetWord;
      const didLose = !didWin && nextGuesses.length >= 6;

      if (didWin) {
        setGameStatus(STATUS.WON);
      } else if (didLose) {
        setGameStatus(STATUS.LOST);
      }

      return {
        ...prev,
        guesses: nextGuesses,
        currentGuess: "",
      };
    });
  }, []);

  const handleKeyInput = useCallback(
    (input: string) => {
      setActiveGame((prev) => {
        if (!prev || gameStatus !== STATUS.PLAYING) return prev;

        const action = getKeyAction({
          input,
          currentGuess: prev.currentGuess,
        });

        switch (action.type) {
          case ACTIONS.ADD:
          case ACTIONS.DELETE:
            return {
              ...prev,
              currentGuess: action.value,
            };
          case ACTIONS.SUBMIT:
            return prev;
          case ACTIONS.NOOP:
          default:
            return prev;
        }
      });

      if (input === "Enter") {
        submitGuess();
      }
    },
    [gameStatus, submitGuess],
  );

  return {
    activeGame,
    gameStatus,
    hasResumableGame,
    isGameOver,
    startNewGame,
    resumeGame,
    abandonGame,
    handleKeyInput
  };
};
