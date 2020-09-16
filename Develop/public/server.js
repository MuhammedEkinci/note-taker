const express = require("require");
const path = require('path');
const fs = require("fs");
const uniqid = require('uniqid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());


//Starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

//====setup the notes for note taker====//
fs.readFile("")