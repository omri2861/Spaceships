import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

import axios from "axios";
import { useHistory } from "react-router-dom";
import NewEntityForm from "./NewEntityForm";
import useSnackbar from "../../../Snackbar";

const emptyElement = {
  data: {
    name: "",
    image: "",
    functions: ["Fix Spaceship", "Eat"],
    engines: "",
    fuel: "",
    species: "",
    speed: "",
  },
  position: { x: 200, y: 250 },
  type: "vessel",
};

export default function AddEntityDialog({ setElements }) {
  const [newElement, setNewElement] = React.useState(emptyElement);

  const { showError } = useSnackbar();

  const history = useHistory();

  const handleClose = () => {
    history.push("/"); // TODO: Go back, not home
  };

  const addEntity = () =>
    axios
      .post("/api/addEntity", newElement)
      .then((res) => {
        let addedElement = res.data;
        addedElement.id = addedElement._id;
        setElements((prevElements) => [...prevElements, addedElement]);
      })
      .then(handleClose)
      .catch(showError);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="delete-entity-dialog-title"
      aria-describedby="delete-entity-dialog-description"
    >
      <DialogTitle>Add New Entity</DialogTitle>
      <DialogContent>
        <NewEntityForm newElement={newElement} setNewElement={setNewElement} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "red" }}>
          Cancel
        </Button>
        <Button onClick={addEntity} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
