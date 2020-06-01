const express = require('express');
const router = express.Router();

const db = require('../models');

/* Index */
/* router.get('/', (req, res) => {
  res.send();
}); */

/* New */
router.get('/new', async (req, res) => {
  res.render('activities/new');
});

/* Show */
router.get('/:id', async (req, res) => {
  try {
    const foundActivity = await db.Activity.findById(req.params.id)
    const context = { activity: foundActivity }
    res.render('activities/show', context);
  } catch (err) {
    res.send('Internal Server Error');
  }
});

/* Create */
router.post('/', async (req, res) => {
  res.render('/activities');
});

/* Edit */
router.get('/:id/edit', (req, res) => {
  res.render('activities/edit');
});

/* Update */
router.put('/:id', (req, res) => {
  res.send('/activities/:id');
});

/* Delete */
router.delete('/:id', (req, res) => {
  res.send('/activities');
});






module.exports = router;