import React from "react";
import { Box } from "@material-ui/core";
import EntityPane from "./EntityPane";
import EntityDrawer from "./EntityView";
import ContextMenu from "./ContextMenu";
import DeleteEntityDialog from "./Dialogs/DeleteEntityDialog";
import AddEntityDialog from "./Dialogs/AddEntityDialog";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

export default function Map() {
  const [elements, setElements] = React.useState([]);

  const [target, setTarget] = React.useState(null);

  const [showDrawer, setShowDrawer] = React.useState(false);

  const [contextMenuState, setContextMenuState] = React.useState({
    mouseX: null,
    mouseY: null,
  });

  React.useEffect(() => {
    fetch("/entities")
      .then((response) => response.json())
      .then((newElements) => {
        newElements.forEach((ent) => {
          ent.id = ent._id;
        });
        setElements(newElements);
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
        <EntityPane
          onPaneContextMenu={showContextMenu}
          onElementClick={onElementClick}
          onNodeContextMenu={showContextMenu}
          onEdgeContextMenu={showContextMenu}
          elements={elements}
        />
        <EntityDrawer entity={target} open={showDrawer} onClose={closeDrawer} />
        <ContextMenu
          {...contextMenuState}
          onClose={closeContextMenu}
          setElements={setElements}
          target={target}
        />

        <Switch>
          <Route path="/deleteEntity">
            <DeleteEntityDialog target={target} setElements={setElements} />
          </Route>
          <Route path="/addEntity">
            <AddEntityDialog setElements={setElements} />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}
