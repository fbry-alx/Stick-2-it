const express = require('express');
const router = express.Router();

const db = require('../models');

/* Index */
router.get('/', (req, res) => {
  db.User.findBy({}, (err, allHabits) => {
    if (err) {
      res.send({ message: 'Internal Server Error' });
    } else {
      res.render('habits/index', { habits: allHabits });
    }
  });
});

/* New */
router.get('/new', (req, res) => {
  db.Habit.find({}, (err, allHabits) => {
    if (err) {
      res.send({ message: 'Internal Server Error' });
    } else {
      res.render('habits/new', { activites: allHabits });
    }
  })
});

/* Show */
router.get('/:id', (req, res) => {
  db.Habit.findById(req.params.id).populate('').exec((err, foundHabit) => {
    if (err) {
      res.send({ message: 'Internal Server Error' });
    } else {
      res.render('habits/show', { habit: foundHabit });
    }
  })
});

/* Create */
router.post('/', (req, res) => {
  db.Habit.create(req.body, (err, createdHabit) => {
    if (err) {
      res.send({ message: 'Internal Server Error' });
    } else {
      db.Activity.findybyId()
    }
  })
  res.send('/habits');
});

/* Edit */
router.get('/:id/edit', (req, res) => {
  db.Habit.findById(req.params.id, (err, editedHabit) => {
    if (err) {
      res.send({ message: 'Internal Server Error' })
    } else {
      res.render('habit/edit', { habit: editedHabit })
    }
  })
});

/* Update */
router.put('/:id', (req, res) => {
  db.Habit.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedHabit) => {
    if (err) {
      res.send({ message: 'Internal Server Error' });
    } else {
      res.redirect(`/habits/${updatedHabit}._id`);
    }
  })
});

/* Delete */
router.delete('/:id', (req, res) => {
  db.Habit.findByIdAndDelete(req.params.id, (err, deletedHabit) => {
    if (err) {
      res.send({ message: 'Internal Server Error' })
    } else {
      res.redirect('/habits');
    }
  })
});



module.exports = router;