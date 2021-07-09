import { Handle } from "react-flow-renderer";
import Toucan from "../assets/toucan.png";
import Bee from "../assets/bee.png";
import Elephant from "../assets/elephant.png";
import Whale from "../assets/whale.png";

const typeImages = {
  toucan: Toucan,
  bee: Bee,
  elephant: Elephant,
  whale: Whale,
};

const customNodeStyles = {
  color: "black",
  fontSize: "16px",
  padding: 10,
  width: "50px",
};

function createCustomNode(nodeType) {
  return ({ data }) => (
    <div style={customNodeStyles}>
      <Handle type="target" position="left" style={{ borderRadius: 0 }} />
      <img
        // TODO: Move to server
        src={typeImages[nodeType]}
        // TODO: Capitalize?
        alt={nodeType}
        style={{ width: "100%" }}
      />
      <p>{data.text}</p>
      <Handle type="source" position="right" style={{ borderRadius: 0 }} />
    </div>
  );
}

var nodeTypes = {};
for (let animal in typeImages) {
    nodeTypes[animal] = createCustomNode(animal);
}

export default nodeTypes;
