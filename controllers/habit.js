const express = require('express');
const router = express.Router();
const controllers = require('../controllers/activity');
const affixHabit = require('../middleware/affixHabit');
const db = require('../models');

/* New */
router.get('/new', async (req, res) => {
  res.render('habits/new');
});

/* Show */
router.get('/:id', async (req, res) => {
  try {
    const foundHabit = await db.Habit.findById(req.params.id).populate('log');
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
router.get('/:id/edit', async (req, res) => {
  try {
    const currentHabit = await db.Habit.findById(req.params.id);
    res.render('habits/edit', { habit: currentHabit });
  } catch (err) {
    console.log(err);
    res.send('internal server error')
  }
});

/* Update */
router.put('/:id', async (req, res) => {
  try {
    const updatedHabit = await db.Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/habits/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
});

/* Delete */
router.delete('/:id', async (req, res) => {
  try {
    const deletedHabit = await db.Habit.findByIdAndDelete(req.params.id);
    const currentUser = await db.User.findById(req.session.currentUser.id);
    await currentUser.habits.remove(deletedHabit);
    console.log(currentUser.habits);
    currentUser.save();
    res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
});

/* Activity routes */
router.use('/:id/activities', affixHabit, controllers);


module.exports = router;