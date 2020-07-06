const express = require("express");
const fs = require("fs");
const parser = require("body-parser");
const path = require("path");
const app = express();

let PORT = process.env.PORT || 3000;

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname + "/db/db.json"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"))
})




app.listen(PORT, function() {
    console.log(`App is listening on PORT ${PORT}`);
})