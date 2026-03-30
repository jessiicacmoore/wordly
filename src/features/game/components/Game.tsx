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

  if (gameStatus === "idle" && hasResumableGame) {
    return (
      <>
        <h2>Welcome Back</h2>
        <button onClick={resumeGame}>Resume game</button>
        <button onClick={startNewGame}>Start new game</button>
      </>
    );
  }

  if (gameStatus === "idle") {
    return (
      <>
        <h2>Ready to Play?</h2>
        <button onClick={startNewGame}>Start new game</button>
      </>
    );
  }

  if (isGameOver && activeGame) {
    return (
      <>
        <h2>{gameStatus === "won" ? "You won!" : "You lost!"}</h2>
        <p>The word was {activeGame.targetWord}.</p>
        <button type="button" onClick={startNewGame}>
          Play again
        </button>
        <button type="button" onClick={abandonGame}>
          Exit
        </button>
      </>
    );
  }

  if (gameStatus === "playing" && activeGame) {
    return (
      <>
        <h2>Game in Progress</h2>
        <button type="button" onClick={abandonGame}>
          Abandon game
        </button>
        <GameBoard game={activeGame} onKeyInput={handleKeyInput} />
      </>
    );
  }

  return null;
};
