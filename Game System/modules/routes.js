const Game_Types = require('../../Utils/game_types');
const express = require('express');
const ServerClass = require('./server');
const server = new ServerClass();
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

function page_to_display(params) {
  // Select Page to Display Based on Parameters Sent
  if (Object.keys(params).includes('ROOMCODE' && 'USERNAME')) {
      return 'avatar';
  } else if (Object.keys(params).includes('AVATAR_ID')) {
      return 'loading';
  }
}

// Host Pages

// Index Page
router.get('/', (req, res) => {
  res.render('pages/index');
});

// Game Join Page
router.get('/jeopardy', (req, res) => {
  // TODO: Generalize?
  server.run_game(Game_Types.Jeopardy).then((code) => {
      res.render('pages/jeopardy', { room_code: code });
  })
});

// Player Pages

// Player Join Page
router.get('/join', (req, res) => {
  res.render('pages/join');
});

router.post('/join', (req, res) => {
  let current_client = server.get_client(req.session.id);

  switch (page_to_display(req.body)) {
    case 'avatar':
      // Avatar Selection Page
      current_client.create_ws(req.body);
      current_client.recieve_msg().then(() => {
        res.render('pages/avatar');
      }).catch(() => {
        // TODO: Display Error
        res.render('pages/join');
      })
      break;
    case 'loading':
      // Game Wait Page
      current_client.send_avatar_selection(req.body);
      current_client.recieve_msg().then(() => {
        res.render('pages/loading', {
          game: Object.keys(Game_Types)[current_client.game]
        });
      }).catch(() => {
        // TODO: Display Error
        res.render('pages/avatar');
      })
    default:
      // TODO: Render Error Page?
      break;
  }
});

// Jeopardy Board Page
router.post('/jeopardy/board', (req, res) => {
  server.start_gs(req.body.code);
  res.render('pages/jeopardy/board')
})


// Categories Page
// TODO: Fix
router.post('/jeopardy/categories', (req, res) => {
  // TODO: Move from Loading Page to "Your Turn" Page
  let client = server.get_client(req.session.id);
  if (server.client_game_started(client) && !client.current_player) {
    client.check_if_turn();
    client.recieve_msg().then(() => {
      client.current_player = true;
      res.render('pages/jeopardy/categories');
    }).catch(() => {
      res.render('pages/loading', {
        game: Object.keys(Game_Types)[client.game]
      });
    })
  } else {
    res.render('pages/loading', {
      game: Object.keys(Game_Types)[client.game]
    });
  }
});

module.exports = router;