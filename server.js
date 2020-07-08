const express = require("express");
const fs = require("fs");
const parser = require("body-parser");
const path = require("path");
const app = express();

let PORT = process.env.PORT || 3000;

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(parser.json({ type: "application/**json" }));
app.use(express.static("public"));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", function (req, res) {

    let id = 1

    fs.readFile(`${__dirname}/db/db.json`, function (err, data) {
        if (err)
            res.status(500).json({ message: "Error" });

        let userNote = {
            title: req.body.title,
            text: req.body.text
        };
        let template = JSON.parse(data);
        template.push(userNote);

        for (let i = 0; i < template.length; i++) {
            template[i].id = id;
            id++;
        }

        fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(template), function (err) {
            if (err) throw err;
        })
    });
});

app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(`${__dirname}/db/db.json`, function (err, data) {
        if (err) throw err;

        let template = JSON.parse(data);

        for (let i = 0; i < template.length; i++) {
            if (template[i].id == req.params.id) {
                template.splice(i, 1);
                console.log(template);
            }
        }

        fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(template), function (err) {
            if (err) throw error;
        })
    });
})

app.listen(PORT, function () {
    console.log(`App is listening on PORT ${PORT}`);
})