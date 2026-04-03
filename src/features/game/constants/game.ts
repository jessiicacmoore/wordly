export const STATUS = {
  IDLE: "idle",
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export const TILE_STATUS = {
  ABSENT: "absent",
  PRESENT: "present",
  CORRECT: "correct",
} as const;

export type TileStatus = (typeof TILE_STATUS)[keyof typeof TILE_STATUS];
export type KeyStatus = Exclude<TileStatus, "">;

export const KEY_STATUS_PRIORITY: Record<KeyStatus, number> = {
  [TILE_STATUS.ABSENT]: 0,
  [TILE_STATUS.PRESENT]: 1,
  [TILE_STATUS.CORRECT]: 2,
};

export const ACTIONS = {
  ADD: "add",
  DELETE: "delete",
  SUBMIT: "submit",
  NOOP: "noop",
} as const;

export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];
