export const STATUS = {
  IDLE: "idle",
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];