const router = require('express').Router();

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');

// This router imports the notes.js
router.use('/notes', notesRouter);

module.exports = router;
