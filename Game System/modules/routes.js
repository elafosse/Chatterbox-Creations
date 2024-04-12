const Game_Types = require('../../Utils/game_types');
const express = require('express');
const ServerClass = require('./server');
const server = new ServerClass();
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Display Switches

function host_page_to_display(params) {
  // Select Page to Display on Host Screen Based on Parameters Sent
  if (Object.keys(params).includes('CHOSEN_GAME')) {
    return 'host_join';
  } else if (Object.keys(params).includes('START_GAME')) {
    return 'start_game';
  }
}

function page_to_display(params) {
  // Select Page to Display on Player Screen Based on Parameters Sent
  if (Object.keys(params).includes('ROOMCODE') && Object.keys(params).includes('USERNAME')) {
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
  } else if (Object.keys(params).includes('NEW_GAME')) {
    return 'new_game';
  } else if (Object.keys(params).includes('EXIT')) {
    return 'exit';
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

  switch(host_page_to_display(req.body)) {
    case 'host_join':
      switch(req.body.CHOSEN_GAME) {
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
      break;
    case 'start_game':
      // Jeopardy Board Page
      server.start_game_session(req.session.id).then((map) => {
        if (server.check_if_game_session_done(req.session.id)) {
          let leaderboard = server.get_leaderboard(req.session.id);
          res.render('pages/leaderboard', { leaderboard: leaderboard });
        } else {
          res.render('pages' + req.body.START_GAME, { data: map });
        }
      });
      break;
  }
});

// Jeopardy Pages
router.post('/jeopardy', (req, res) => {
  server.check_current_host_state(req.session.id).then((change) => {
    if (server.check_if_game_session_done(req.session.id)) {
      let leaderboard = server.get_leaderboard(req.session.id);
      res.render('pages/leaderboard', { leaderboard: leaderboard });
    } else {
      res.render('pages/jeopardy/' + change.Page, { data: change.Data })
    }
  }); 
})

// Leaderboard Page
router.get('/leaderboard', (req, res) => {
  // TODO: Display Leaderboard on Screen
  let leaderboard = server.get_leaderboard(req.session.id);
  res.render('pages/leaderboard', { leaderboard: leaderboard });
});


// Player Pages

// Player Join Page
router.get('/play', (req, res) => {
  res.render('pages/player_join');
});

router.post('/play', (req, res) => {
  let current_client = server.get_client(req.session.id);

  switch (page_to_display(req.body)) {
    case 'avatar':
      // Avatar Selection Page
      current_client.create_connection_with_server(req.body);
      current_client.recieve_msg().then(() => {
        res.render('pages/avatar');
      }).catch((status) => {
        // TODO: Display Error
        res.render('pages/player_join');
      })
      break;
    case 'loading':
      // Game Wait Page
      if (!server.check_if_client_game_started(current_client.session_id)) {
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
        // Checks Player Response
        server.check_response(current_client.session_id, req.body.RESPONSE);
        res.render('pages/loading', {
          game: Object.keys(Game_Types)[current_client.game]
        });
      }
      break;
    case 'categories':
      // Categories Page
      if (server.check_if_game_session_done(current_client.session_id)) {
        res.render('pages/player_endgame');
      } else if (server.check_if_client_game_started(current_client.session_id) && server.check_if_client_turn(current_client.session_id) == 200) {
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
        res.render('pages/jeopardy/player_response');
      }).catch(() => {
        // TODO: Display Error
        res.render('pages/jeopardy/amount');
      })
      break;
    case 'new_game':
      server.restart_game_session(current_client.session_id);
      res.render('pages/loading');
      break;
    case 'exit':
      server.remove_player(current_client.session_id);
      res.render('pages/player_join');
      break;
    default:
      // TODO: Render Error Page?
      break;
  }
});

module.exports = router;