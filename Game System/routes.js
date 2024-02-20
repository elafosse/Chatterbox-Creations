const express = require('express');
const router = express.Router();

// Index Page
router.get('/', (req, res) => {
  res.render('pages/index');
});

module.exports = router;