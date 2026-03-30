import { Button } from "./Button";
import { Heading } from "./Heading";

type WelcomeScreenProps = {
  hasResumableGame: boolean;
  onResumeClick?: () => void;
  onStartNewClick?: () => void;
};

export const WelcomeScreen = ({
  hasResumableGame,
  onResumeClick,
  onStartNewClick,
}: WelcomeScreenProps) => {
  const headingText = hasResumableGame ? "Welcome Back!" : "Welcome to Wordly!";

  const subheadingText = hasResumableGame
    ? "Still thinking about that word? Jump back in or start a new game!"
    : "Ready for a quick challenge? Guess the 5-letter word in six tries!";

  return (
    <div className="text-center">
      <Heading level={2} visualLevel={1}>
        {headingText}
      </Heading>
      <p className="text-lg">{subheadingText}</p>
      <div className="mt-6 flex justify-center gap-4">
        {hasResumableGame && (
          <Button onClick={onResumeClick}>Resume game</Button>
        )}
        <Button variant="secondary" onClick={onStartNewClick}>
          Start new game
        </Button>
      </div>
    </div>
  );
};
