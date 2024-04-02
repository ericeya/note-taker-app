const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  // helper function has been utilized with fsUtils.js file to read the file in promisified format.
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(req.body);

  // deconstructs the body to take in inputs
  const { title, text } = req.body;

  // if the inputs are valid, then it creates a new note object
  if (req.body) {
    const newNote = {
      title,
      text,
      id: crypto.randomUUID()
    };

    // newly created note object is appended into the db.json file using fsUtil helper function.
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding a note');
  }
});

// DELETE Route for deleting notes

// the path here for /:id is grabbed and entered with an event listener when the user clicks the delete button.
// the javascript for that exists in public>assets>js>index.js.
notes.delete('/:id', (req, res) => {
    // first the exisitng db.json file is read as a promisified format.
    readFromFile('./db/db.json')
    .then((data) => {
      // with the read data, iterate through the existing array to find the id matching id.
      let newList = JSON.parse(data)
      for (let i=0; i < newList.length; i++) {
        if (req.params.id === newList[i].id) {
          // below splice function deletes that particular object from the array.
          newList.splice([i],1)
          // then this updated array of objects is written as a brand new data into db.json file.
          writeToFile('./db/db.json', newList)
          // once done, responds with a message completing the delete request response.
          res.status(200).json({msg:`selected note has been deleted`})
        } else {
          // res.status(404).json({msg:'Something went wrong... Such ID does not exist for delete...'})
        }
      }
    }).catch(err=> console.log(err))
  })

module.exports = notes;
