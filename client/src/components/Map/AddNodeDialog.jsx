import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddNodeDialog({ setElements }) {
  const elementTemplate = {
    data: {
      name: "Temp",
      image: "/astronaut1.png",
      functions: ["Fix Spaceship", "Eat"],
      engines: 1,
      fuel: 13,
      species: "Human",
      speed: 50,
    },
    position: { x: 200, y: 250 },
    type: "vessel",
  };

  const history = useHistory();

  const handleClose = () => {
    history.push("/"); // TODO: Go back, not home
  };

  const addElement = () =>
    axios
      .post("/api/addElement", elementTemplate)
      .then((res) => {
        let addedElement = res.data;
        addedElement.id = addedElement._id;
        setElements((prevElements) => [...prevElements, addedElement]);
      })
      .then(handleClose)
      .catch(console.error);

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="delete-node-dialog-title"
      aria-describedby="delete-node-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          New element will be added: {JSON.stringify(elementTemplate)}
        </DialogContentText>
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
