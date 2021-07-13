/*
 * This file is in charge of getting a list of the available
 * entity images, so it could be sent to the user.
 * NOTE: This is a temporary file, and should be moved to a route
 * file when I re-order the server
 */

const fs = require("fs");

const assetsDir = "./assets";

const imageNames = fs
  .readdirSync(assetsDir)
  .map((imageName) => "/" + imageName);

module.exports = imageNames;
