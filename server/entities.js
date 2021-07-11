/*
 * This file is in charge of fetching the enteties in the map
 * from a db, then returning them as an object ready to be
 * sent to the client. For now, this is a placeholder file which
 * just holds the data, hardcoded.
 */

const elements = [
  /* First Star */
  {
    id: "1",
    data: { name: "Zorgon", image: "/planet2.png" },
    position: { x: 150, y: 0 },
    type: "station",
  },
  {
    id: "2",
    data: { name: "Zeke", image: "/rocket.png" },
    position: { x: 50, y: 150 },
    type: "vessel",
  },
  {
    id: "3",
    data: { name: "Rick", image: "/rocket.png" },
    position: { x: 250, y: 150 },
    type: "vessel",
  },
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },

  /* Second Star */
  {
    id: "4",
    data: { name: "Blorgon", image: "/planet1.png" },
    position: { x: 500, y: 0 },
    type: "station",
  },
  {
    id: "5",
    data: { name: "Jack", image: "/spaceship.png" },
    position: { x: 400, y: 150 },
    type: "vessel",
  },
  {
    id: "6",
    data: { name: "Jose", image: "/spaceship.png" },
    position: { x: 600, y: 150 },
    type: "vessel",
  },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e4-6", source: "4", target: "6" },
  /* Star connection*/
  { id: "e1-4", source: "1", target: "4" },
];

function getEntities() {
  return elements;
}

module.exports = getEntities;
