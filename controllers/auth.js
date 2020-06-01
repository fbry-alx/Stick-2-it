const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const db = require('../models');


/* Register */
router.get('/register', (req, res) => {
  res.render('auth/register');
});

/* Register Post */
router.post('/register', async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ email: req.body.email });
    if (foundUser) {
      res.send({ message: 'Email is already in use' });
    }
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const newUser = await db.User.create(req.body);
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.send({ message: 'Internal Server Error' })
  }
})

/* Login */
router.get('/login', (req, res) => {
  res.render('auth/login');
});

/* Login Post */
router.post('/login', async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ email: req.body.email });
    if (!foundUser) {
      res.send({ message: 'Password or Email in incorrect.' });
    }
    console.log(req.body);
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (!match) {
      res.send({ message: 'Password or Email in incorrect.' });
    }
    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username,
    }
    res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.send({ message: 'Internal Server Error' })
  }
});

/* Logout */
router.delete('/logout', async (req, res) => {
  await req.session.destroy();
  res.redirect('/login');
})


/* Profile */
router.get('/profile', async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.session.currentUser.id);
    console.log(foundUser);
    res.render('auth/profile', { user: foundUser })
  } catch {
    res.send({ message: 'Internal Server Error' })
  }
});

module.exports = router;
