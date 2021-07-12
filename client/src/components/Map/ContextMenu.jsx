import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

export default function ContextMenu({ mouseX, mouseY, onClose, target }) {
  console.log("Opening menu for " + target);
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
      {target === "node" && <MenuItem onClick={onClose}>Delete</MenuItem>}
      {target === "edge" && (
        <MenuItem onClick={onClose}>Remove Connection</MenuItem>
      )}
    </Menu>
  );
}
