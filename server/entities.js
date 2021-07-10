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

function getEntities()
{
    return elements;
}

module.exports = getEntities;
