import React from "react";
import { Box } from "@material-ui/core";
import EntityPane from "./EntityPane";
import EntityDrawer from "./EntityView";
import ContextMenu from "./ContextMenu";
import DeleteEntityDialog from "./Dialogs/DeleteEntityDialog";
import AddEntityDialog from "./Dialogs/AddEntityDialog";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import useSnackbar from "../Snackbar";

export default function Map() {
  const { showError } = useSnackbar();
  const [elements, setElements] = React.useState([]);

  const [target, setTarget] = React.useState(null);

  const [showEntityView, setShowEntityView] = React.useState(false);

  const [contextMenuState, setContextMenuState] = React.useState({
    mouseX: null,
    mouseY: null,
  });

  React.useEffect(() => {
    axios
      .get("/entities")
      .then((res) => {
        res.data.forEach((ent) => {
          ent.id = ent._id;
        });
        setElements(res.data);
      })
      // TODO: Handle error properly
      .catch(showError);
  }, []);

  const onElementClick = (event, element) => {
    setTarget(element);
    setShowEntityView(true);
  };

  const closeDrawer = () => setShowEntityView(false);

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
        <EntityDrawer
          entity={target}
          open={showEntityView}
          onClose={closeDrawer}
        />
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
