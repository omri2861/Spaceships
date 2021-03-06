import React from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import { isNode, isEdge } from "react-flow-renderer";
import { useHistory } from "react-router-dom";

export default function ContextMenu({ mouseX, mouseY, onClose, target }) {
  const history = useHistory();

  const redirect = (to) => {
    return () => {
      onClose();
      history.push(to);
    };
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
      <MenuItem onClick={redirect("/addEntity")}>Add Entity</MenuItem>
      {target !== null && isNode(target) && (
        <MenuItem onClick={redirect("/deleteEntity")}>
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
