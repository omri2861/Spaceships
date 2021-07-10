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
  /* First Star */
  {
    id: "1",
    data: { text: "Zorgon" },
    position: { x: 150, y: 0 },
    type: "planet2",
  },
  {
    id: "2",
    data: { text: "Zeke" },
    position: { x: 50, y: 150 },
    type: "rocket",
  },
  {
    id: "3",
    data: { text: "Rick" },
    position: { x: 250, y: 150 },
    type: "rocket",
  },
  { id: "e1-2", source: "1", target: "2"},
  { id: "e1-3", source: "1", target: "3"},

  /* Second Star */
  {
    id: "4",
    data: { text: "Blorgon" },
    position: { x: 500, y: 0 },
    type: "planet1",
  },
  {
    id: "5",
    data: { text: "Jack" },
    position: { x: 400, y: 150 },
    type: "spaceship",
  },
  {
    id: "6",
    data: { text: "Jose" },
    position: { x: 600, y: 150 },
    type: "spaceship",
  },
  { id: "e4-5", source: "4", target: "5"},
  { id: "e4-6", source: "4", target: "6"},
  /* Star connection*/
  { id: "e1-4", source: "1", target: "4"},
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
