const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
// const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: crypto.randomUUID()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding a note');
  }
});

// DELETE Route for deleting notes

notes.delete('/:id', (req, res) => {
    readFromFile('./db/db.json')
    .then((data) => {
      let newList = JSON.parse(data)
      for (let i=0; i < newList.length; i++) {
        if (req.params.id === newList[i].id) {
          newList.splice([i],1)
          writeToFile('./db/db.json', newList)
          res.json(`selected note has been deleted`)
        }
      }
    })
  })

module.exports = notes;
