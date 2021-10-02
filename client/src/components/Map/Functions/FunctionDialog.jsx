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

export default function FunctionDialog() {
  const [func, setFunc] = React.useState({ label: "", args: {}, _id: "" });

  const history = useHistory();
  const { showError } = useSnackbar();

  const handleClose = () => {
    history.push("/"); // TODO: Go back, not home
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
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "red" }}>
          Cancel
        </Button>
        <Button onClick={handleClose} autoFocus>
          Run
        </Button>
      </DialogActions>
    </Dialog>
  );
}
