const express = require("express");
const fs = require("fs");
const parser = require("body-parser");
const path = require("path");
const app = express();

let PORT = process.env.PORT || 3000;

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(parser.json({ type: "application/**json"}));
app.use(express.static("public"));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));

    // fs.readFile(__dirname, "/db/db.json", "utf-8", function(err, data) {
    //     if (err);
    //         console.log("error");
    //             let userNote = {
    //             title: req.body.title,
    //             text: req.body.text
    //             };

    //     let template = JSON.parse(data);
    //     template.push(userNote);

    // });
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", function(req, res) {

    fs.readFile(`${__dirname}/db/db.json`, function(err, data) {
        if (err)
            console.log(err);

        let userNote = {
            title: req.body.title,
            text: req.body.text
        };
        let template = JSON.parse(data);
        template.push(userNote);
    
        fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(template), function(err) {
            if (err) {
                throw err;
            }
            console.log(template);
        })
    });    
});


app.listen(PORT, function() {
    console.log(`App is listening on PORT ${PORT}`);
})