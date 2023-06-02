const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res) =>{
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));
  res.json(notes);

});

app.post('/api/notes', (req, res) =>{
const newNote = req.body;
const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json')));

  // Assign a unique ID to the new note
  newNote.id = uuidv4();
  notes.push(newNote);

  // Save the updated notes array to db.json
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes));

  res.json(newNote);

}
);

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  // Serve the notes.html file
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });
  
app.listen(PORT, ()=>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
