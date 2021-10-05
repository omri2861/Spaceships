import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  LinearProgress,
  Typography,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import useSnackbar from "../../Snackbar";
import axios from "axios";
import io from "socket.io-client";

function LoadingCircle({ show }) {
  if (!show) {
    return null;
  }

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
}

export default function FunctionDialog() {
  const [func, setFunc] = React.useState({ label: "", args: {}, _id: "" });
  const [progress, setProgress] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  const history = useHistory();
  const { showError } = useSnackbar();

  const { funcId } = useParams();

  const handleClose = () => {
    if (isRunning) {
      // We don't want to close the dialog if the function is still running
      return;
    }
    history.push("/"); // TODO: Go back, not home
  };

  const runFunction = () => {
    const socket = io("http://localhost:8000/");
    setIsRunning(true);
    socket.on("progress", (newProgress) => {
      setProgress(newProgress.value);
    });
    socket.on("done", () => {
      socket.close();
      setIsRunning(false);
    });
    socket.emit("run", { funcId, entity: "omri" });
  };

  React.useEffect(() => {
    axios
      .get(`/api/function/${funcId}`)
      .then((res) => setFunc(res.data))
      .catch(showError);
  }, [funcId]);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="function-dialog-title"
      aria-describedby="function-dialog-description"
      fullWidth="true"
      minWidth="sm"
    >
      <DialogTitle>{func.label}</DialogTitle>
      <DialogContent>
        {/* TODO: Add description for each function */}
        <DialogContentText id="function-dialog-description">
          <Typography>{JSON.stringify(func.args)}</Typography>
        </DialogContentText>
        <LoadingCircle show={isRunning} />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={isRunning ? {} : { color: "red" }}
          disabled={isRunning}
        >
          Cancel
        </Button>
        <Button onClick={runFunction} autoFocus disabled={isRunning}>
          Run
        </Button>
      </DialogActions>
      <LinearProgress variant="determinate" value={progress} />
    </Dialog>
  );
}
