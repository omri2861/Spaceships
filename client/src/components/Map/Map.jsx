import React from "react";
import { Box } from "@material-ui/core";
import FlowRenderer from "./FlowRenderer";
import EntityDrawer from "../EntityView/EntityDrawer";
import ContextMenu from "./ContextMenu";

const initialContextMenuState = {
  mouseX: null,
  mouseY: null,
  target: "pane",
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

  function openContextMenu(target) {
    return (event) => {
      event.preventDefault();
      setContextMenuState({
        mouseX: event.clientX - 2,
        mouseY: event.clientY - 4,
        target,
      });
    };
  }

  const closeContextMenu = () => setContextMenuState(initialContextMenuState);

  return (
    <Box>
      <FlowRenderer
        onPaneContextMenu={openContextMenu("pane")}
        onElementClick={onElementClick}
        onNodeContextMenu={openContextMenu("node")}
      />
      <EntityDrawer {...infoDrawerState} onClose={closeDrawer} />
      <ContextMenu {...contextMenuState} onClose={closeContextMenu} />
    </Box>
  );
}
