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
import NewElementForm from "./NewElementForm";

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

export default function AddNodeDialog({ setElements }) {
  const [newElement, setNewElement] = React.useState(emptyElement);

  const history = useHistory();

  const handleClose = () => {
    history.push("/"); // TODO: Go back, not home
  };

  const addElement = () => console.log(newElement);
  // axios
  //   .post("/api/addElement", newElement)
  //   .then((res) => {
  //     let addedElement = res.data;
  //     addedElement.id = addedElement._id;
  //     setElements((prevElements) => [...prevElements, addedElement]);
  //   })
  //   .then(handleClose)
  //   .catch(console.error);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="delete-node-dialog-title"
      aria-describedby="delete-node-dialog-description"
    >
      <DialogTitle>Add New Element</DialogTitle>
      <DialogContent>
        <NewElementForm newElement={newElement} setNewElement={setNewElement} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "red" }}>
          Cancel
        </Button>
        <Button onClick={addElement} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
