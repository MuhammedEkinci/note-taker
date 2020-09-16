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
fs.readFile("db/db.json", "utf-8", (err,data) => {

    if(err) throw err;

    let notes = JSON.parse(data);

    //=====routes=====//
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    //notes will then be sent to db.json
    app.post("/api/notes/:id", function(req, res) {
        let newNotes = req.body;
        newNotes.id = uniqid()
        notes.push(newNotes);
        renderDB();
        res.send("saved new notes!");
        return console.log("Added new notes:" + newNotes.title);
    });

    app.get("/api/notes/:id", function(req,res) {
        res.json(notes[req.params.id]);
    });

    app.delete("/api/notes/:id", function(req, res) {
        notes = notes.filter(
            note => {
                return note.id != req.params.id;
            }
        )
         updateDb();
         res.send('successful!');
         console.log("Deleted note with ID of "+req.params.id);
     });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "index.html"));
    });
});