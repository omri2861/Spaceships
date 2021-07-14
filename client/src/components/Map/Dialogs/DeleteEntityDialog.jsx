import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { removeElements } from "react-flow-renderer";
import useSnackbar from "../../Snackbar";

export default function DeleteEntityDialog({ target, setElements }) {
  const history = useHistory();
  const { showError } = useSnackbar();

  const handleClose = () => {
    history.push("/"); // TODO: Go back, not home
  };

  const deleteEntity = () => {
    if (target == null) {
      console.error("Trying to delete null element");
      return;
    }
    axios
      .delete(`/api/deleteEntity/${target.id}`)
      .then(
        setElements((prevElements) => removeElements([target], prevElements))
      )
      .then(handleClose)
      .catch(showError);
  };

  if (target === null) {
    console.error("Attempting to delete null node");
    return null;
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="delete-entity-dialog-title"
      aria-describedby="delete-entity-dialog-description"
    >
      <DialogTitle>Delete Entity</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete '{target.data.name}'?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "red" }}>
          Cancel
        </Button>
        <Button onClick={deleteEntity} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
