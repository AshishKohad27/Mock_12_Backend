const express = require("express");
const calculateRoute = express.Router();

calculateRoute.post("/", async (req, res) => {
    const { amount, year, rate } = req.body
})

module.exports = calculateRoute;