import React from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { makeStyles } from "@material-ui/core";
import nodeTypes from "./CustomNode";
import EntityDrawer from "./EntityView/EntityDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "solid #ffffff",
    // TODO: Fix canvas height to match window height
    height: "800px",
    width: "98%",
    // TODO: Support theming
    backgroundColor: "#ffffff",
  },
}));

export default function Canvas() {
  const classes = useStyles();

  const [entities, setEntities] = React.useState([]);

  const [infoDrawerState, setInfoDrawerState] = React.useState({
    isOpen: false,
    entity: { data: {}, name: "" },
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

  const onLoad = (reactFlowInstance) => {
    // TODO: Maybe optimize using useCallback?
    reactFlowInstance.fitView();
  };

  const onElementClick = (event, element) => {
    setInfoDrawerState({ entity: element, isOpen: true });
  };

  const closeDrawer = () =>
    setInfoDrawerState((prevState) => ({ ...prevState, isOpen: false }));

  return (
    <div className={classes.root}>
      <ReactFlow
        elements={entities}
        nodeTypes={nodeTypes}
        onLoad={onLoad}
        onElementClick={onElementClick}
      >
        <Background variant="lines" gap={12} size={1} />
        <Controls />
      </ReactFlow>
      <EntityDrawer
        entity={infoDrawerState.entity}
        open={infoDrawerState.isOpen}
        onClose={closeDrawer}
      />
    </div>
  );
}
