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
  } else if (Object.keys(params).includes('TURN_CHECK')) {
    return 'categories'
  } else if (Object.keys(params).includes('CATEGORY')) {
    return 'amount';
  } else if (Object.keys(params).includes('AMOUNT')) {
    return 'answer';
  } else if (Object.keys(params).includes('RESPONSE')) {
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
      if (!server.client_game_started(current_client)) {
        current_client.send_avatar_selection(req.body);
        current_client.recieve_msg().then(() => {
          res.render('pages/loading', {
            game: Object.keys(Game_Types)[current_client.game]
          });
        }).catch(() => {
          // TODO: Display Error
          res.render('pages/avatar');
        })
      } else {
        server.next_turn(current_client.session_id);
        res.render('pages/loading', {
          game: Object.keys(Game_Types)[current_client.game]
        });
      }
      break;
    case 'categories':
      // Categories Page
      if (server.client_game_started(current_client) && server.check_turn(current_client.session_id) == 200) {
        res.render('pages/jeopardy/categories');
      } else {
        res.render('pages/loading', {
          game: Object.keys(Game_Types)[current_client.game]
        });
      }
      break;
    case 'amount':
      // Amount Page
      current_client.send_category_selection(req.body);
      current_client.recieve_msg().then(() => {
        res.render('pages/jeopardy/amount');
      }).catch(() => {
        // TODO: Display Error
        res.render('pages/jeopardy/categories');
      })
      break;
    case 'answer':
      // Player Answer Page
      current_client.send_amount_selection(req.body);
      current_client.recieve_msg().then(() => {
        res.render('pages/jeopardy/response');
      }).catch(() => {
        // TODO: Display Error
        res.render('pages/jeopardy/amount');
      })
      break;
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

module.exports = router;