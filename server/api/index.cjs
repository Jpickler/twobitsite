
const express = require("express");

const router = express.Router();

// const client = require('../db/client.cjs');
// client.connect();

router.use("/scores", require("./scores.cjs"));




module.exports = router;
// /home/twobitbandit/playground/twobitbanditsite/twobitbanditsite/db/client.cjs
// /home/twobitbandit/playground/twobitbanditsite/twobitbanditsite/server/api/index.cjs