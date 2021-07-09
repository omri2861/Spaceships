import React from "react";
import ReactFlow from "react-flow-renderer";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "solid #ffffff",
    height: "600px",
    width: "600px",
    backgroundColor: "#ffffff",
  },
}));

const elements = [
  { id: "1", data: { label: "Node 1" }, position: { x: 250, y: 5 } },
  // you can also pass a React component as a label
  { id: "2", data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
  { id: "e1-2", source: "1", target: "2", animated: true },
];

export default function Canvas() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ReactFlow elements={elements} />
    </div>
  );
}
