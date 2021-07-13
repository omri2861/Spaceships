import React from "react";
import { Box } from "@material-ui/core";
import FlowRenderer from "./FlowRenderer";
import EntityDrawer from "../EntityView/EntityDrawer";
import ContextMenu from "./ContextMenu";
import DeleteNodeDialog from "./DeleteNodeDialog";
import AddNodeDialog from "./AddNodeDialog";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

export default function Map() {
  const [entities, setEntities] = React.useState([]);

  const [target, setTarget] = React.useState(null);

  const [showDrawer, setShowDrawer] = React.useState(false);

  const [contextMenuState, setContextMenuState] = React.useState({
    mouseX: null,
    mouseY: null,
  });

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

  const onElementClick = (event, element) => {
    setTarget(element);
    setShowDrawer(true);
  };

  const closeDrawer = () => setShowDrawer(false);

  const showContextMenu = (event, node) => {
    event.preventDefault();
    if (node !== undefined) {
      setTarget(node);
    }
    setContextMenuState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const closeContextMenu = () =>
    setContextMenuState({ mouseX: null, mouseY: null });

  return (
    <Box>
      <Router>
        <FlowRenderer
          onPaneContextMenu={showContextMenu}
          onElementClick={onElementClick}
          onNodeContextMenu={showContextMenu}
          onEdgeContextMenu={showContextMenu}
          elements={entities}
        />
        <EntityDrawer entity={target} open={showDrawer} onClose={closeDrawer} />
        <ContextMenu
          {...contextMenuState}
          onClose={closeContextMenu}
          setElements={setEntities}
          target={target}
        />

        <Switch>
          <Route path="/deleteElement">
            <DeleteNodeDialog target={target} setElements={setEntities} />
          </Route>
          <Route path="/addElement">
            <AddNodeDialog setElements={setEntities} />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}
