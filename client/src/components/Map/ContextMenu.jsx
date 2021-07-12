import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

export default function ContextMenu({ mouseX, mouseY, onClose }) {
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
      <MenuItem onClick={onClose}>Copy</MenuItem>
      <MenuItem onClick={onClose}>Print</MenuItem>
      <MenuItem onClick={onClose}>Highlight</MenuItem>
      <MenuItem onClick={onClose}>Email</MenuItem>
    </Menu>
  );
}
