import Canvas from "./components/Canvas";
import Bar from "./components/Bar";
import { EntityViewProvider } from "./components/EntityView";

function App() {
  return (
    <div>
      <EntityViewProvider>
        <Bar />
        <Canvas />
      </EntityViewProvider>
    </div>
  );
}

export default App;
