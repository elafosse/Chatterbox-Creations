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
router.post('/', (req, res) => {
  let game, type, path;
  switch(req.body.chosen_game) {
    case 'jeopardy':
      game = 'Jeopardy';
      type = Game_Types.Jeopardy;
      path = "/jeopardy/board";
      break;
    default:
        // TODO: Show Error Screen?
      break;
  }

  server.init_game_session(type, req.session.id).then((code) => {
    res.render('pages/host_join', { game: game, room_code: code, path: path });
  })
});

// Jeopardy Board Page
router.post('/jeopardy/board', (req, res) => {
  server.start_game_session(req.session.id).then(() => {
    res.render('pages/jeopardy/board');
  });
})

// Jeopardy Question Page
router.post('/jeopardy/question', (req, res) => {
  // TODO: Change URL
  server.check_if_host_needs_to_change(req.session.id).then((change) => {
    res.render('pages/jeopardy/' + change.Page, { data: change.Data })
  });
})

// Jeopardy Answer Page
router.post('/jeopardy/check_response_was_submitted', (req, res) => {
  // TODO: Finish
  server.check_if_response(id);
})


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


// Checks Player Response
router.post('/jeopardy/check_response', (req, res) => {
  // TODO: Finish
  server.check_if_response(id);
})


module.exports = router;