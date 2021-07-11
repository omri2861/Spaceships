import Canvas from "./components/Canvas";
import Bar from "./components/Bar";
import { DrawerProvider } from "./components/useDrawer";

function App() {
  return (
    <div>
      <DrawerProvider>
        <Bar />
        <Canvas />
      </DrawerProvider>
    </div>
  );
}

export default App;
