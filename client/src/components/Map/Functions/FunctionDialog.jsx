import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import useSnackbar from "../../Snackbar";
import axios from "axios";
import io from "socket.io-client";
import {AutoForm, getInitialValues} from "../../AutoForm";
import LoadingCircle from "./LoadingCircle";
import { useFormik } from "formik";

export default function FunctionDialog() {
  const [func, setFunc] = React.useState({ label: "", args: {}, _id: "" });
  const [progress, setProgress] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  const history = useHistory();
  const { showError } = useSnackbar();

  const { funcId, entityId } = useParams();

  const runFunction = (values) => {
    const socket = io("http://localhost:8000/");
    setIsRunning(true);
    socket.on("progress", (newProgress) => {
      setProgress(newProgress.value);
    });
    socket.on("done", () => {
      socket.close();
      setIsRunning(false);
    });
    socket.emit("run", { funcId, entityId, args: values });
  };

  // NOTE: React thinks that the component changes from controlled to uncontrolled, since the
  // initial values are only given once the useEffect hook ends. Hence, the initial values are
  // always {}.
  // TODO: Fix this issue
  const formik = useFormik({
    initialValues: getInitialValues(func.args),
    onSubmit: runFunction,
  });

  const handleClose = () => {
    if (isRunning) {
      // We don't want to close the dialog if the function is still running
      return;
    }
    history.push("/"); // TODO: Go back, not home
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
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{func.label}</DialogTitle>
      <DialogContent style={{"overflow": "visible"}}>
      <DialogContentText>{func.description}</DialogContentText>
          <AutoForm definition={func.args} formik={formik} />
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
        <Button onClick={formik.handleSubmit} autoFocus disabled={isRunning}>
          Run
        </Button>
      </DialogActions>
      <LinearProgress variant="determinate" value={progress} />
    </Dialog>
  );
}
