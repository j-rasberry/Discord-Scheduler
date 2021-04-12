const express = require('express');
const app = new express();
const port = 3000;
const PATH = require('path');
const bodyParser = require("body-parser");
const {
    send
} = require('process');
require('dotenv').config();

app.use('/', express.static(__dirname + "/src"));





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})