import React from "react";
import { Box } from "@material-ui/core";
import FlowRenderer from "./FlowRenderer";
import EntityDrawer from "../EntityView/EntityDrawer";
import ContextMenu from "./ContextMenu";

const initialContextMenuState = {
  mouseX: null,
  mouseY: null,
};

export default function Map() {
  const [infoDrawerState, setInfoDrawerState] = React.useState({
    open: false,
    entity: { data: {}, name: "" },
  });

  const [contextMenuState, setContextMenuState] = React.useState(
    initialContextMenuState
  );

  const closeDrawer = () =>
    setInfoDrawerState((prevState) => ({ ...prevState, open: false }));

  const onElementClick = (event, element) => {
    setInfoDrawerState({ entity: element, open: true });
  };

  const openContextMenu = (event) => {
    event.preventDefault();
    setContextMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const closeContextMenu = () => setContextMenuState(initialContextMenuState);

  return (
    <Box onContextMenu={openContextMenu} style={{ cursor: "context-menu" }}>
      <FlowRenderer onElementClick={onElementClick} />
      <EntityDrawer {...infoDrawerState} onClose={closeDrawer} />
      <ContextMenu {...contextMenuState} onClose={closeContextMenu} />
    </Box>
  );
}
