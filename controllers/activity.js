const express = require('express');
const router = express.Router();

const db = require('../models');

/* Index */
/* router.get('/', (req, res) => {
  res.send();
}); */

/* New */
router.get('/new', (req, res) => {
  res.render('activities/new');
});

/* Show */
router.get('/:id', (req, res) => {
  res.render('activities/show');
});


/* Create */
router.post('/', (req, res) => {
  res.send('/activity');
});

/* Edit */
router.get('/:id/edit', (req, res) => {
  res.render('activities/edit');
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