import React from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import { isNode, isEdge } from "react-flow-renderer";
import { Link } from "react-router-dom";

export default function ContextMenu({ mouseX, mouseY, onClose, target }) {
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
      <Link to="/addElement">
        <MenuItem>Add Element</MenuItem>
      </Link>
      {target !== null && isNode(target) && (
        <Link to="/deleteElement">
          <MenuItem>
            <Typography color="error">Delete</Typography>
          </MenuItem>
        </Link>
      )}
      {target !== null && isEdge(target) && (
        <MenuItem onClick={onClose}>
          <Typography color="error">Remove Connection</Typography>
        </MenuItem>
      )}
    </Menu>
  );
}
