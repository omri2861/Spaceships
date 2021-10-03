import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import useSnackbar from "../../Snackbar";
import axios from "axios";
import io from "socket.io-client";

export default function FunctionDialog() {
  const [func, setFunc] = React.useState({ label: "", args: {}, _id: "" });
  const [progress, setProgress] = React.useState("0%");

  const history = useHistory();
  const { showError } = useSnackbar();

  const handleClose = () => {
    history.push("/"); // TODO: Go back, not home
  };

  const runFunction = () => {
    const socket = io("http://localhost:5000");
    socket.on("progress", (newProgress) => {
      setProgress(newProgress);
    });
    socket.on("done", () => socket.close());
    socket.emit("run", { funcId, entity: "omri" });
  };

  let { funcId } = useParams();

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
    >
      <DialogTitle>{func.label}</DialogTitle>
      <DialogContent>
        {/* TODO: Add description for each function */}
        <DialogContentText id="function-dialog-description">
          {JSON.stringify(func.args)}
          <br />
          Progress:
          {progress}
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
    </Dialog>
  );
}
