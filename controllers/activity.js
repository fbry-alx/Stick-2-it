const express = require('express');
const router = express.Router();

const db = require('../models');

/* Index */
router.get('/', (req, res) => {
  res.send('/activity');
});

/* New */
router.get('/new', (req, res) => {
  res.send('/activity/new');
});

/* Show */
router.get('/:id', (req, res) => {
  res.send('/activity/:id');
});


/* Create */
router.post('/', (req, res) => {
  res.send('/activity');
});

/* Edit */
router.get('/:id/edit', (req, res) => {
  res.send('/activity/:id/edit');
});

/* Update */
router.put('/:id', (req, res) => {
  res.send('/activity/:id');
});

/* Delete */
router.delete('/:id', (req, res) => {
  res.send('/activity');
});






module.exports = router;