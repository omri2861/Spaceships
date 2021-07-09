import React from "react";
import ReactFlow from "react-flow-renderer";
import { makeStyles } from "@material-ui/core";
import nodeTypes from "./CustomNode";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "solid #ffffff",
    height: "600px",
    width: "600px",
    backgroundColor: "#ffffff",
  },
}));

const elements = [
  {
    id: "1",
    data: { text: "Toucan" },
    position: { x: 250, y: 5 },
    type: "toucan",
  },
  {
    id: "2",
    data: { text: "Whale" },
    position: { x: 100, y: 100 },
    type: "whale",
  },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "3", data: { text: "Bee" }, position: { x: 400, y: 100 }, type: "bee" },
  { id: "4", data: { text: "Elephant" }, position: { x: 250, y: 200 }, type: "elephant" },
];

export default function Canvas() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ReactFlow elements={elements} nodeTypes={nodeTypes} />
    </div>
  );
}
