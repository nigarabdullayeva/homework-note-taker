// dependencies 
const express = require ("express");
const path = require ("path");
const fs = require("fs");
const db = require("./db/db.json");

// set up express app

const app = express(); 
const PORT = process.env.PORT || 7000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let noteDB = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json"), (err,data) => {
    if(err) throw err;
}));



//routes 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes",(req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));

});

app.get("/api/notes", (req, res) =>{
    res.json(noteDB);
});




// posting new notes into the server
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    noteDB.push(newNote);
    newNote.id = parseInt(noteDB.length)+1;
    fs.readFile("./db/db.json","utf-8",(err, data) => {
        let addedNotes =JSON.parse(data);
        addedNotes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(addedNotes),(err)=>
    {
        if(err) throw err
        res.json(addedNotes);
    });
  });
});

//deleting notes from the server 

app.delete ("/api/notes/:id", (req, res) => {
    const deleteNote = req.params.id
    noteDB = noteDB.filter((note)=> {
        note.id != req.params.id
    });
    fs.writeFile("./db/db.json", JSON.stringify(noteDB),(err) => 
    {
        if(err) throw err
       res.json(noteDB)
    });
});




//starts server to begin listening
app.listen(PORT, function() {
    console.log(`App listening on PORT: ${PORT}`);
  })
