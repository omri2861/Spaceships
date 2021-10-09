import { Drawer } from "@material-ui/core";
import React from "react";
import EntityDetails from "./EntityDetails";

export default function EntityView({ open, element, onClose }) {
  if (element === null && !open) {
    return null;
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {/* TODO: When auto positioning is done, remove this destructure */}
      <EntityDetails entity={{ ...element.data, id: element.id }} />
    </Drawer>
  );
}
