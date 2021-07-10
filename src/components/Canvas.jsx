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

const elements = [
  {
    id: "1",
    data: { text: "Zorgon" },
    position: { x: 250, y: 5 },
    type: "planet2",
  },
  {
    id: "2",
    data: { text: "Blorgon" },
    position: { x: 100, y: 100 },
    type: "planet1",
  },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "3", data: { text: "Jack" }, position: { x: 400, y: 100 }, type: "spaceship" },
  {
    id: "4",
    data: { text: "Bomber" },
    position: { x: 250, y: 200 },
    type: "rocket",
  },
];

export default function Canvas() {
  const classes = useStyles();
  

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  return (
    <div className={classes.root}>
      <ReactFlow elements={elements} nodeTypes={nodeTypes} onLoad={onLoad}>
        <Background variant="lines" gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
