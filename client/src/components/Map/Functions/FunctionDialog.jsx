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
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import useSnackbar from "../../Snackbar";
import axios from "axios";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "500px",
  },
}));

export default function FunctionDialog() {
  const classes = useStyles();

  const [func, setFunc] = React.useState({ label: "", args: {}, _id: "" });
  const [progress, setProgress] = React.useState(0);

  const history = useHistory();
  const { showError } = useSnackbar();

  const { funcId } = useParams();

  const handleClose = () => {
    history.push("/"); // TODO: Go back, not home
  };

  const runFunction = () => {
    const socket = io("http://localhost:5000");
    socket.on("progress", (newProgress) => {
      setProgress(newProgress.value);
    });
    socket.on("done", () => socket.close());
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "red" }}>
          Cancel
        </Button>
        <Button onClick={runFunction} autoFocus>
          Run
        </Button>
      </DialogActions>
      <LinearProgress variant="determinate" value={progress} />
    </Dialog>
  );
}
