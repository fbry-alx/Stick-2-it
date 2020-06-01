const express = require('express');
const router = express.Router();

const db = require('../models');

/* Index */
router.get('/', (req, res) => {
  res.send('/activity')
});








module.exports = router;