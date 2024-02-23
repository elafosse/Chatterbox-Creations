const Game_Types = require('../../Utils/game_types');
const express = require('express');
const Server = require('./server');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Index Page
router.get('/', (req, res) => {
  res.render('pages/index');
});

// Jeopardy Game Page
router.get('/jeopardy', (req, res) => {
  Server.run_game(Game_Types.Jeopardy).then((value) => {
    res.render('pages/jeopardy', { room_code: value });
  })
});

module.exports = router;