import React from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { makeStyles } from "@material-ui/core";
import nodeTypes from "./CustomNode";
import useDrawer from "./useDrawer";

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

  const entityView = useDrawer();

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
    entityView.showEntity(element.data);
  };

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
    </div>
  );
}
