import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
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
        <MenuItem onClick={onClose}>Delete</MenuItem>
      )}
      {target !== null && isEdge(target) && (
        <MenuItem onClick={onClose}>Remove Connection</MenuItem>
      )}
    </Menu>
  );
}
