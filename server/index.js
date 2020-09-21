require("@babel/register")({
  presets: ["@babel/preset-env"],
  ignore: ["node_modules"],
});
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");

// Import the rest of our application.
module.exports = require("./server.js");
