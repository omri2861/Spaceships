import React from "react";
import { Box } from "@material-ui/core";
import FlowRenderer from "./FlowRenderer";
import EntityDrawer from "../EntityView/EntityDrawer";

export default function Map() {
  const [infoDrawerState, setInfoDrawerState] = React.useState({
    isOpen: false,
    entity: { data: {}, name: "" },
  });

  const closeDrawer = () =>
    setInfoDrawerState((prevState) => ({ ...prevState, isOpen: false }));

  const onElementClick = (event, element) => {
    setInfoDrawerState({ entity: element, isOpen: true });
  };

  return (
    <Box>
      <FlowRenderer onElementClick={onElementClick} />
      <EntityDrawer
        entity={infoDrawerState.entity}
        open={infoDrawerState.isOpen}
        onClose={closeDrawer}
      />
    </Box>
  );
}
