import Map from "./components/Map";
import Bar from "./components/Bar";
import { useSnackbar, SnackbarProvider } from "./components/Snackbar";
import { Button } from "@material-ui/core";

function SnackbarButton() {
  const { openSnackbar } = useSnackbar();

  const handleClick = () =>
    openSnackbar("This is an error message...", "error");

  return <Button onClick={handleClick}>Open Snackbar</Button>;
}

function App() {
  return (
    <div>
      <SnackbarProvider>
        <Bar />
        <Map />
        <SnackbarButton />
      </SnackbarProvider>
    </div>
  );
}

export default App;
