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
  } else if (Object.keys(params).includes('END_GAME')) {
    return 'end_game';
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

      if (server.host_game_exists(req.session.id)) {
        res.render('pages/host_join', { game: game, room_code: server.get_session_code(req.session.id), path: path, players: server.get_players(req.session.id) });
        break;
      }

      server.init_game_session(type, req.session.id).then((code) => {
        res.render('pages/host_join', { game: game, room_code: code, path: path, players: undefined });
      });
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
    case 'end_game':
      server.end_session(req.session.id);
      res.render('pages/index');
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
  let leaderboard = server.get_leaderboard(req.session.id);
  res.render('pages/leaderboard', { leaderboard: leaderboard });
});


// Player Pages

// Player Join Page
router.get('/play', (req, res) => {
  res.render('pages/player_join', { error: undefined });
});

router.post('/play', (req, res) => {
  let current_client = server.get_client(req.session.id);
  let error;

  switch (page_to_display(req.body)) {
    case 'avatar':
      // Avatar Selection Page
      current_client.create_connection_with_server(req.body);
      current_client.recieve_msg().then(() => {
        res.render('pages/avatar', { error });
      }).catch((status) => {
        if (status == 400) {
          error = "Name not allowed";
        } else if (status == 404) {
          error = "Game Session with Room Code not found";
        } else if (status == 406) {
          error = "No more players allowed for game session";
        }

        res.render('pages/player_join', { error });
      })
      break;
    case 'loading':
      // Game Wait Page
      if (!server.check_if_client_game_started(current_client.session_id)) {
        current_client.send_avatar_selection(req.body);
        current_client.recieve_msg().then(() => {
          res.render('pages/loading', {
            error,
            game: Object.keys(Game_Types)[current_client.game]
          });
        }).catch((status) => {
          if (status == 400) {
            error = "Avatar Selected by another player";
          } else if (status == 404) {
            error = "Avatar Does Not Exist";
          }
  
          res.render('pages/avatar', { error });
        })
      } else {
        // Checks Player Response
        server.check_response(current_client.session_id, req.body.RESPONSE);
        res.render('pages/loading', {
          error,
          game: Object.keys(Game_Types)[current_client.game]
        });
      }
      break;
    case 'categories':
      // Categories Page
      if (server.check_if_game_session_done(current_client.session_id)) {
        res.render('pages/player_endgame');
      } else if (server.check_if_client_game_started(current_client.session_id) && server.check_if_client_turn(current_client.session_id) == 200) {
        res.render('pages/jeopardy/categories', { error, categories: server.get_jy_categories(current_client.session_id)});
      } else {
        res.render('pages/loading', {
          error,
          game: Object.keys(Game_Types)[current_client.game]
        });
      }
      break;
    case 'amount':
      // Amount Page
      current_client.send_category_selection(req.body);
      current_client.recieve_msg().then(() => {
        res.render('pages/jeopardy/amount', { error, amounts: server.get_jy_amounts(current_client.session_id)});
      }).catch((status) => {
        if (status == 404) {
          error = "Make A Selection";
        }

        res.render('pages/jeopardy/categories', { error, categories: server.get_jy_categories(current_client.session_id)});
      })
      break;
    case 'answer':
      // Player Answer Page
      current_client.send_amount_selection(req.body);
      current_client.recieve_msg().then(() => {
        res.render('pages/jeopardy/player_response');
      }).catch((status) => {
        if (status == 404) {
          error = "Make A Selection";
        }

        res.render('pages/jeopardy/amount', { error, amounts: server.get_jy_amounts(current_client.session_id)});
      })
      break;
    case 'new_game':
      server.restart_game_session(current_client.session_id);
      res.render('pages/loading', {
        error,
        game: Object.keys(Game_Types)[current_client.game]
      });
      break;
    case 'exit':
      server.remove_player(current_client.session_id);
      current_client.ws.close();
      res.render('pages/player_join', { error });
      break;
    default:
      // TODO: Render Error Page?
      break;
  }
});

module.exports = router;