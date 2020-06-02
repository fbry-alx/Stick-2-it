const express = require('express');
const router = express.Router();

const db = require('../models');

/* Index */
/* router.get('/', (req, res) => {
  res.send();
}); */

/* New */
router.get('/new', async (req, res) => {
  try {
    const currentUser = await db.User.findById(req.session.currentUser.id).populate('habits');
    res.render('activities/new', { habits: currentUser.habits });
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
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
  try {
    const newActivity = await db.Activity.create({
      name: req.body.name,
      duration: req.body.duration,
      notes: req.body.notes,
    });
    const habit = await db.Habit.findById(req.body.habit);
    habit.log.push(newActivity);
    habit.save();
    console.log(req.body);
    res.redirect(`habits/${req.body.habit}`)
  } catch (err) {
    console.log(err);
    res.send('internal server error')
  }
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