import { AppLayout } from "@/components";
import "./App.css";
import AppProvider from "./Provider";
import { GameView } from "@/features/game";

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <GameView />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
