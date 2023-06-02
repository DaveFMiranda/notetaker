// Requires NPM packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// Sets up the API function
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static("public"));
app.use(express.json());

// Loads existing notes from db.json
app.get("/api/notes", (req, res) => {
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db", "db.json"))
  );
  res.json(notes);
});

// Adds new notes to db.json
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db", "db.json"))
  );
  newNote.id = uuidv4();
  notes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "db", "db.json"),
    JSON.stringify(notes)
  );
  res.json(newNote);
});

// Serves index.html on load
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serves notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
