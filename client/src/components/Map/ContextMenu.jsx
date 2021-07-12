import React from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import { isNode, isEdge } from "react-flow-renderer";

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
      <MenuItem onClick={onClose}>Add Element</MenuItem>
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
