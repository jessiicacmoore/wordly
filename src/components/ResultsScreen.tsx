import { Button } from "./Button";
import { Heading } from "./Heading";

type ResultsScreenProps = {
  hasWon: boolean;
  targetWord: string;
  onPlayAgain: () => void;
  onExit: () => void;
};

export const ResultsScreen = ({
  hasWon,
  targetWord,
  onPlayAgain,
  onExit,
}: ResultsScreenProps) => {
  return (
    <div className="text-center">
      <Heading level={2} visualLevel={1}>
        {hasWon ? "You Won!" : "You Lost!"}
      </Heading>
      <p className="text-lg">The word was {targetWord}.</p>
      <div className="mt-6 flex justify-center gap-4">
        <Button onClick={onPlayAgain}>Play again</Button>
        <Button variant="secondary" onClick={onExit}>
          Exit
        </Button>
      </div>
    </div>
  );
};
