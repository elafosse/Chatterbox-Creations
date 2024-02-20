const Game_Types = require('../Utils/game_types');
const express = require('express');
const router = express.Router();

// Index Page
router.get('/', (req, res) => {
  res.render('pages/index');
});

// Jeopardy Game Page
router.get('/jeopardy', (req, res) => {
  run_game(Game_Types.Jeopardy);
  res.render('pages/jeopardy');
});

module.exports = router;