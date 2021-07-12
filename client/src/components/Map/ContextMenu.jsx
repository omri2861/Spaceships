import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

export default function MapContextMenu() {
  const [state, setState] = React.useState(initialState);

  const handleClose = () => {
    setState(initialState);
  };
  return (
    <Menu
      keepMounted
      open={state.mouseY !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        state.mouseY !== null && state.mouseX !== null
          ? { top: state.mouseY, left: state.mouseX }
          : undefined
      }
    >
      <MenuItem onClick={handleClose}>Copy</MenuItem>
      <MenuItem onClick={handleClose}>Print</MenuItem>
      <MenuItem onClick={handleClose}>Highlight</MenuItem>
      <MenuItem onClick={handleClose}>Email</MenuItem>
    </Menu>
  );
}
