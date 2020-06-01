const express = require('express');
const router = express.Router();

const db = require('../models');

/* Index */
router.get('/', (req, res) => {
  res.send('/habit');
});

/* New */
router.get('/new', (req, res) => {
  res.send('/habit/new');
});

/* Show */
router.get('/:id', (req, res) => {
  res.send('/habit/:id');
});


/* Create */
router.post('/', (req, res) => {
  res.send('/habit');
});

/* Edit */
router.get('/:id/edit', (req, res) => {
  res.send('/habit/:id/edit');
});

/* Update */
router.put('/:id', (req, res) => {
  res.send('/habit/:id');
});

/* Delete */
router.delete('/:id', (req, res) => {
  res.send('/habit');
});



module.exports = router;