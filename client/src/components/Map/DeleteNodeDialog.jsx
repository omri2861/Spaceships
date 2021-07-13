import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { removeElements } from "react-flow-renderer";

export default function DeleteNodeDialog({ target, setElements }) {
  const history = useHistory();

  const handleClose = () => {
    history.push("/"); // TODO: Go back, not home
  };

  const deleteElement = () => {
    if (target == null) {
      console.error("Trying to delete null element");
      return;
    }
    axios
      .delete(`/api/deleteElement/${target.id}`)
      .then(
        setElements((prevElements) => removeElements([target], prevElements))
      )
      .then(handleClose)
      .catch(console.error);
  };

  if (target === null) {
    console.error("Attempting to delete null node");
    return null;
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="delete-node-dialog-title"
      aria-describedby="delete-node-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete '{target.data.name}'?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "red" }}>
          Cancel
        </Button>
        <Button onClick={deleteElement} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
