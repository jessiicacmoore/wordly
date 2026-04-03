import type { KeyStatus } from "../constants";
import { KeyboardKey } from "./KeyboardKey";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  keyStatuses?: Partial<Record<string, KeyStatus>>;
};

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

export const Keyboard = ({ onKeyPress, keyStatuses = {} }: KeyboardProps) => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((key) => (
            <KeyboardKey
              key={key}
              value={key}
              status={keyStatuses[key.toLowerCase()]}
              onPress={onKeyPress}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
