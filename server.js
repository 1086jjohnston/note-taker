//loading dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./Develop/db/db")

//load Express
var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.static('./Develop/public'));

//parses data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//gets index & notes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
})

//API routes
app.route("/api/notes")
    
    .get(function (req, res) {
        res.json(database);
    })

    
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "./Develop/db/db.json");
        let newNote = req.body;

        
        let highestId = 99;
            for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {
                highestId = individualNote.id;
            }
        }
        newNote.id = highestId + 1;
        database.push(newNote)

        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("You have saved a note!");
        });
        res.json(newNote);
    });

app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "./Develop/db/db.json");
    for (let i = 0; i < database.length; i++) {

        if (database[i].id == req.params.id) {
           database.splice(i, 1);
            break;
        }
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("You have deleted a note!");
        }
    });
    res.json(database);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});