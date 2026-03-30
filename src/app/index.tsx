import { AppLayout } from "@/components";
import "./App.css";
import AppProvider from "./Provider";
import { Game } from "@/features/game";

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <Game />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
