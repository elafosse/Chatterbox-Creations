const Game_Types = require('../../Utils/game_types');
const express = require('express');
const ServerClass = require('./server');
const router = express.Router();

const server = new ServerClass();

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
  let c = server.get_client(req.session.id);

  switch (match_body(req.body)) {
    case 'avatar':
      // Avatar Selection Page
      c.create_ws(req.body);
      c.recieve_msg().then((status) => {
        res.render('pages/avatar');
      }).catch(() => {
        // TODO: Display Error
        res.render('pages/join');
      })
      break;
    case 'loading':
      // Game Wait Page
      c.send_avatar_selection(req.body)
      c.recieve_msg().then((value) => {
        res.render('pages/loading', { game: Object.keys(Game_Types)[c.game] });
      }).catch(() => {
        res.render('pages/avatar');
      })
    default:
      break;
  }
});

// Jeopardy Pages

// Jeopardy Game Page
router.get('/jeopardy', (req, res) => {
  server.run_game(Game_Types.Jeopardy).then((value) => {
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