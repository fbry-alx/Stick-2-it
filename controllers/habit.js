const express = require('express');
const router = express.Router();
const db = require('../models');

/* New */
router.get('/new', async (req, res) => {
  res.render('habits/new');
});

/* Show */
router.get('/:id', async (req, res) => {
  try {
    const foundHabit = await db.Habit.findById(req.params.id);
    const context = { habit: foundHabit };
    res.render('habits/show', context);
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
});

/* Create */
router.post('/', async (req, res) => {
  try {
    const currentUser = await db.User.findById(req.session.currentUser.id).populate('habits');
    const newHabit = await db.Habit.create({ name: req.body.name, frequency: req.body.frequency })
    currentUser.habits.push(newHabit._id);
    currentUser.save();
    res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
});

/* Edit */
router.get('/:id/edit', (req, res) => {

});

/* Update */
router.put('/:id', (req, res) => {

});

/* Delete */
router.delete('/:id', (req, res) => {

});


module.exports = router;