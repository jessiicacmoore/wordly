import { ResultsScreen, WelcomeScreen } from "@/components";
import { useGameSession } from "../hooks";
import { GameBoard } from "./GameBoard";

export const Game = () => {
  const {
    activeGame,
    gameStatus,
    hasResumableGame,
    isGameOver,
    startNewGame,
    resumeGame,
    abandonGame,
    handleKeyInput,
  } = useGameSession();

  if (gameStatus === "idle") {
    return (
      <WelcomeScreen
        hasResumableGame={hasResumableGame}
        onResumeClick={resumeGame}
        onStartNewClick={startNewGame}
      />
    );
  }

  if (isGameOver && activeGame) {
    return (
      <ResultsScreen
        hasWon={gameStatus === "won"}
        targetWord={activeGame.targetWord}
        onPlayAgain={startNewGame}
        onExit={abandonGame}
      />
    );
  }

  if (gameStatus === "playing" && activeGame) {
    return <GameBoard game={activeGame} onKeyInput={handleKeyInput} />;
  }

  return null;
};
