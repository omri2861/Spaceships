import React from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import { isNode, isEdge } from "react-flow-renderer";
import axios from "axios";

export default function ContextMenu({
  mouseX,
  mouseY,
  onClose,
  target,
  setElements,
}) {
  const addElement = () => {
    let newElement = {
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

    axios
      .post("/api/addElement", newElement)
      .then((res) => {
        let addedElement = res.data;
        addedElement.id = addedElement._id;
        setElements((prevElements) => [...prevElements, addedElement]);
      })
      .then(onClose)
      .catch(console.log);
  };

  return (
    <Menu
      keepMounted
      open={mouseY !== null}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        mouseY !== null && mouseX !== null
          ? { top: mouseY, left: mouseX }
          : undefined
      }
    >
      <MenuItem onClick={addElement}>Add Element</MenuItem>
      {target !== null && isNode(target) && (
        <MenuItem onClick={onClose}>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      )}
      {target !== null && isEdge(target) && (
        <MenuItem onClick={onClose}>
          <Typography color="error">Remove Connection</Typography>
        </MenuItem>
      )}
    </Menu>
  );
}
