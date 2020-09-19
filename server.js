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

//gets notes from db.json
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    //get the saved data
    var noteArray = JSON.parse(fs.readFileSync(path.join(__dirname, "db/db.json")));
    noteArray.push(newNote);

    var reformattedData = JSON.stringify(noteArray);
    fs.writeFileSync(path.join(__dirname, "db/db.json"), reformattedData);

    //the actual contents of the responce doesn't matter in this case
    //it just needs a responce so the function's Promises will run
    res.send("Success");
});

app.delete("/delete/note/:id", function (req, res) {
    let id = req.params.id;
    
    var noteArray = JSON.parse(fs.readFileSync(path.join(__dirname, "db/db.json")));

    //creates a new note array of every note, except the one that's being deleted
    noteArray = noteArray.filter((value) => { 
        if(value.id != id){
            return value;
        }
    });

    var reformattedData = JSON.stringify(noteArray);
    fs.writeFileSync(path.join(__dirname, "db/db.json"), reformattedData);

    //the actual contents of the responce doesn't matter in this case
    //it just needs a responce so the function's Promises will run
    res.send("Success");
});

