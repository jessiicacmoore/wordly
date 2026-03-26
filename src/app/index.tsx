import { AppLayout } from "@/components";
import "./App.css";
import AppProvider from "./Provider";

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <h1>Hello World!</h1>
      </AppLayout>
    </AppProvider>
  );
}

export default App;
