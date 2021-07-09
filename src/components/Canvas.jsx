import React from "react";
import ReactFlow, { Handle } from "react-flow-renderer";
import { makeStyles } from "@material-ui/core";
import Toucan from "../assets/toucan.png";

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
    type: "special",
  },
  // you can also pass a React component as a label
  { id: "2", data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
  { id: "e1-2", source: "1", target: "2", animated: true },
];

const customNodeStyles = {
  color: "black",
  fontSize: "16px",
  padding: 10,
  width: "50px",
};

const imgStyle = {
  width: "100%"
};

const CustomNodeComponent = ({ data }) => {
  return (
    <div style={customNodeStyles}>
      <Handle type="target" position="left" style={{ borderRadius: 0 }} />
      <img src={Toucan} alt="Toucan" style={imgStyle} />
      <p>{data.text}</p>
      <Handle type="source" position="right" style={{ borderRadius: 0 }} />
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
      <ReactFlow elements={elements} nodeTypes={nodeTypes} />
    </div>
  );
}
