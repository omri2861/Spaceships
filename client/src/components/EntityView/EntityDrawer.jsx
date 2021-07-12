import { Drawer } from "@material-ui/core";
import React from "react";
import EntityDetails from "./EntityDetails";

export default function EntityDrawer({ open, entity, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <EntityDetails entity={entity} />
    </Drawer>
  );
}
