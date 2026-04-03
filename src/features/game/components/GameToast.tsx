import { cn } from "@/utils";

type GameToastProps = {
  message: string | null;
};

export const GameToast = ({ message }: GameToastProps) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none",
        "animate-in fade-in slide-in-from-top-2 duration-200",
      )}
    >
      <div className="bg-toast-bg text-toast-text rounded-md border border-gray-200 px-4 py-2 text-sm font-medium shadow-lg dark:border-slate-600">
        {message}
      </div>
    </div>
  );
};
