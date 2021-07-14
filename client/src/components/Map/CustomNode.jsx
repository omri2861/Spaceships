import { Handle } from "react-flow-renderer";

const customNodeStyles = {
  color: "black",
  fontSize: "16px",
  padding: 10,
  width: "50px",
};

function CustomNode({ data }) {
  return (
    <div style={customNodeStyles}>
      <Handle type="target" position="top" style={{ borderRadius: 0 }} />
      <Handle type="source" position="top" style={{ borderRadius: 0 }} />
      <img
        // TODO: Move to server
        src={data.image}
        // TODO: Capitalize?
        alt={data.image}
        style={{ width: "100%", position: "relative" }}
      />
      <p>{data.name}</p>
    </div>
  );
}

var nodeTypes = {custom: CustomNode};

export default nodeTypes;
