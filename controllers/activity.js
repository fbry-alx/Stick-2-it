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
    res.redirect(`habits/${req.body.habit}`)
  } catch (err) {
    console.log(err);
    res.send('internal server error')
  }
});

/* Edit */
router.get('/:id/edit', async (req, res) => {
  try {
    const foundActivity = await db.Activity.findById(req.params.id);
    res.render('activities/edit', { activity: foundActivity });

  } catch (err) {

  }
});

/* Update */
router.put('/:id', async (req, res) => {
  try {
    const updatedActivity = await db.Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/activities/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }

});

/* Delete */
router.delete('/:id', async (req, res) => {
  //TODO daltons idea of restful routes going to habit controller
  try {
    const deletedActivity = await db.Activity.findByIdAndDelete(req.params.id);
    const currentUser = await db.User.findById(req.session.currentUser.id).populate('habits');
    currentUser.habits.forEach(async habit => {
      let currentHabit = await db.Habit.findById(habit._id).populate(log);
      currentHabit.log.forEach(async activity => {
        if (activity._id === deletedActivity._id) {
          await currentHabit.log.remove(deletedActivity);
        }
      })
    })
    res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.send('internal server error');
  }
});






module.exports = router;