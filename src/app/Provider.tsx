import { ThemeProvider } from "@/features/theme/context";
import type { ReactNode } from "react";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AppProvider;
