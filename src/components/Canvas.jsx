import React from "react";
import ReactFlow, { Handle } from "react-flow-renderer";
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
  { id: "1", data: {text: "This is some example text"}, position: { x: 250, y: 5 }, type: "special"},
  // you can also pass a React component as a label
  { id: "2", data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
  { id: "e1-2", source: "1", target: "2", animated: true },
];

const customNodeStyles = {
  background: "#9CA8B3",
  color: "#FFF",
  padding: 10,
};

const CustomNodeComponent = ({ data }) => {
  return (
    <div style={customNodeStyles}>
      <Handle type="target" position="left" style={{ borderRadius: 0 }} />
      <div>{data.text}</div>
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: "30%", borderRadius: 0 }}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ top: "70%", borderRadius: 0 }}
      />
    </div>
  );
};

const nodeTypes = {
  special: CustomNodeComponent,
};

export default function Canvas() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ReactFlow elements={elements} nodeTypes={nodeTypes}/>
    </div>
  );
}
