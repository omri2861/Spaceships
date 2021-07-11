import Canvas from "./components/Canvas";
import Bar from "./components/Bar";
import DrawerButton from "./components/DrawerButton";
import { DrawerProvider } from "./components/useDrawer";

function App() {
  return (
    <div>
      <DrawerProvider>
        <Bar />
        <Canvas />
        <DrawerButton />
      </DrawerProvider>
    </div>
  );
}

export default App;
