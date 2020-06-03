const express = require('express');
const router = express.Router();
const db = require('../models');

/* New */
router.get('/new', async (req, res) => {
  try {
    const parentHabit = await db.Habit.findById(req.habitID);
    res.render('activities/new', { habit: parentHabit });
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
});

/* Show */
router.get('/:id', async (req, res) => {
  try {
    const foundActivity = await db.Activity.findById(req.params.id)
    const parentHabit = await db.Habit.findById(req.habitID);
    const context = { activity: foundActivity, habit: req.habitID }
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
    const habit = await db.Habit.findById(req.habitID);
    await habit.log.push(newActivity);
    await habit.save();
    res.redirect(`/habits/${req.habitID}`)
  } catch (err) {
    console.log(err);
    res.send('internal server error')
  }
});

/* Edit */
router.get('/:id/edit', async (req, res) => {
  try {
    const foundActivity = await db.Activity.findById(req.params.id);
    res.render('activities/edit', { activity: foundActivity, habit: req.habitID });
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
});

/* Update */
router.put('/:id', async (req, res) => {
  try {
    const updatedActivity = await db.Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/habits/${req.habitID}/activities/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
});

/* Delete */
router.delete('/:id', async (req, res) => {
  try {
    const deletedActivity = await db.Activity.findByIdAndDelete(req.params.id);
    const parentHabit = await db.Habit.findById(req.habitID).populate('log');
    await parentHabit.log.remove(deletedActivity);
    await parentHabit.save();
    res.redirect(`/habits/${req.habitID}`);
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
});

module.exports = router;