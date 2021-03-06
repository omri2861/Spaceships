import React from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import { makeStyles } from "@material-ui/core";
import nodeTypes from "./CustomNode";

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

export default function EntityPane(props) {
  const classes = useStyles();

  const onLoad = (reactFlowInstance) => {
    // TODO: Maybe optimize using useCallback?
    reactFlowInstance.fitView();
  };

  return (
    <div className={classes.root}>
      <ReactFlow
        nodeTypes={nodeTypes}
        onLoad={onLoad}
        {...props}
      >
        <Background variant="lines" gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
