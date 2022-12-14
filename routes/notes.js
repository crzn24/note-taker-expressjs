////// API Router for notes ////////

const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes first
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});



// BONUS Delete request
// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
notes.delete('/:id', (req, res) => {
  console.info(`${req.method} request received to delete a note`);

  
  readFromFile('./db/db.json').then((data) => {
    let notes = JSON.parse(data);
    // use console.log(req.params.id); to view the id number of the note you want to delete
    // use console.log(notes); to see the notes array
    // use filter method on the notes array to filter out the deleted note by checking on the id value, and then write to the file with the newly filtered array.
    
    const filteredNotes = notes.filter(note => note.id !== req.params.id);

    writeToFile('./db/db.json', filteredNotes);
    res.json(`Note deleted successfully 🚀`);
  });

});




module.exports = notes;