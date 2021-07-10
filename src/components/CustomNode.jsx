import { Handle } from "react-flow-renderer";

import Astronaut1 from "../assets/astronaut1.png";
import Astronaut2 from "../assets/astronaut2.png";
import Planet1 from "../assets/planet1.png";
import Planet2 from "../assets/planet2.png";
import Planet3 from "../assets/planet3.png";
import Planet4 from "../assets/planet4.png";
import Rocket from "../assets/rocket.png";
import Satellite1 from "../assets/satellite1.png";
import Satellite2 from "../assets/satellite2.png";
import Spaceship from "../assets/spaceship.png";

const typeImages = {
  astronaut1: Astronaut1,
  astronaut2: Astronaut2,
  planet1: Planet1,
  planet2: Planet2,
  planet3: Planet3,
  planet4: Planet4,
  rocket: Rocket,
  satellite1: Satellite1,
  satellite2: Satellite2,
  spaceship: Spaceship,
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
