const Game_Types = require('../../Utils/game_types');
const express = require('express');
const Server = require('./server');
const Client = require('./client');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

function match_body(data) {
  if (Object.keys(data).includes('ROOMCODE' && 'USERNAME')) {
      return 'avatar';
  } else if (Object.keys(data).includes('AVATAR_ID')) {
      return 'loading';
  }
}

// Index Page
router.get('/', (req, res) => {
  res.render('pages/index');
});

// Player Join Page
router.get('/join', (req, res) => {
  res.render('pages/join');
});

router.post('/join', (req, res) => {
  switch (match_body(req.body)) {
      case 'avatar':
          // Avatar Page
          Client.create_ws(req.body).then((value) => {
              res.render('pages/avatar');
          })
          break;
      case 'loading':
          // Game Wait Page
          Client.send_avatar_selection(req.body).then((value) => {
              res.render('pages/loading');
          })
      default:
          break;
  }
});


// Jeopardy Pages

// Jeopardy Game Page
router.get('/jeopardy', (req, res) => {
  Server.run_game(Game_Types.Jeopardy).then((value) => {
    res.render('pages/jeopardy', { room_code: value });
  })
});

// Categories Page
router.post('/jeopardy/categories', (req, res) => {
  connect_to_server(req.body).then((value) => {
      // TODO: Render Next Page
      res.render('pages/');
  })
});

module.exports = router;