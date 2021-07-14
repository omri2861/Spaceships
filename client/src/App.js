import Map from "./components/Map";
import Bar from "./components/Bar";
import { SnackbarProvider } from "./components/Snackbar";


function App() {
  return (
    <div>
      <SnackbarProvider>
        <Bar />
        <Map />
      </SnackbarProvider>
    </div>
  );
}

export default App;
