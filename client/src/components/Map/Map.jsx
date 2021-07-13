import React from "react";
import { Box } from "@material-ui/core";
import FlowRenderer from "./FlowRenderer";
import EntityDrawer from "../EntityView/EntityDrawer";
import ContextMenu from "./ContextMenu";
import DeleteNodeDialog from "./DeleteNodeDialog";
import AddNodeDialog from "./AddNodeDialog";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const initialContextMenuState = {
  mouseX: null,
  mouseY: null,
  target: null,
};

export default function Map() {
  const [infoDrawerState, setInfoDrawerState] = React.useState({
    open: false,
    entity: { data: {}, name: "" },
  });

  const [contextMenuState, setContextMenuState] = React.useState(
    initialContextMenuState
  );

  const [entities, setEntities] = React.useState([]);

  React.useEffect(() => {
    fetch("/entities")
      .then((response) => response.json())
      .then((newEntities) => {
        newEntities.forEach((ent) => {
          ent.id = ent._id;
        });
        setEntities(newEntities);
      })
      // TODO: Handle error properly
      .catch(console.log);
  }, []);

  const closeDrawer = () =>
    setInfoDrawerState((prevState) => ({ ...prevState, open: false }));

  const onElementClick = (event, element) => {
    setInfoDrawerState({ entity: element, open: true });
  };

  const paneContextMenu = (event) => {
    event.preventDefault();
    setContextMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      target: null,
    });
  };

  const elementContextMenu = (event, node) => {
    event.preventDefault();
    setContextMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      target: node,
    });
  };

  const closeContextMenu = () => setContextMenuState(initialContextMenuState);

  return (
    <Box>
      <Router>
        <FlowRenderer
          onPaneContextMenu={paneContextMenu}
          onElementClick={onElementClick}
          onNodeContextMenu={elementContextMenu}
          onEdgeContextMenu={elementContextMenu}
          elements={entities}
        />
        <EntityDrawer {...infoDrawerState} onClose={closeDrawer} />
        <ContextMenu
          {...contextMenuState}
          onClose={closeContextMenu}
          setElements={setEntities}
        />

        <Switch>
          <Route path="/deleteElement">
            <DeleteNodeDialog
              target={contextMenuState.target}
              setElements={setEntities}
            />
          </Route>
          <Route path="/addElement">
            <AddNodeDialog setElements={setEntities} />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}
