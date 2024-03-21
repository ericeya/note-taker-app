const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
// const { v4: uuidv4 } = require('uuid');

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
    console.log(req.params.id)
    res.send(`${req.method}`)
    fetch('/api/notes/:id', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
    })
})

// app.get('/api/reviews/:review_id', (req, res) => {
//     if (req.params.review_id) {
//       console.info(`${req.method} request received to get a single a review`);
//       const reviewId = req.params.review_id;
//       for (let i = 0; i < reviews.length; i++) {
//         const currentReview = reviews[i];
//         if (currentReview.review_id === reviewId) {
//           res.json(currentReview);
//           return;
//         }
//       }
//       res.status(404).send('Review not found');
//     } else {
//       res.status(400).send('Review ID not provided');
//     }
//   });

module.exports = notes;
