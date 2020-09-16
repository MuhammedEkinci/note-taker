const express = require("express");
const path = require('path');
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());


//Starts the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});
