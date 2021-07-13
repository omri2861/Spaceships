import React from "react";
import { Menu, MenuItem, Typography } from "@material-ui/core";
import { isNode, isEdge } from "react-flow-renderer";
import { Link, useHistory } from "react-router-dom";

export default function ContextMenu({ mouseX, mouseY, onClose, target }) {
  const history = useHistory();

  const redirect = (to) => {
    // TODO: also close menu, when you fix delete issue
    return () => history.push(to);
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
      <MenuItem onClick={redirect("/addElement")}>Add Element</MenuItem>
      {target !== null && isNode(target) && (
        <MenuItem onClick={redirect("/deleteElement")}>
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
