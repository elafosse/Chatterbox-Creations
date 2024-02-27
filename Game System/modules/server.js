// Server
const WebSocketServer = require('ws').Server;
const Game_Session = require('./game_session');
const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types');
const PORT = 3001

const wss = new WebSocketServer({ port: PORT });
const ACTIVE_GAME_SESSIONS = new Set();
const ACTIVE_ROOMCODES = new Set();

function ws_server() {
    wss.on('connection', ((ws) => {
        ws.on('message', (message) => {
            let msg = (new Message()).import_data(message);
            switch (msg.type) {
                case Types.Handshake:
                    handshake_response(ws, msg)
                    break;
                case Types.Avatar:
                    set_player_avatar(ws, name, avatar)
                    break;
                default:
                    console.log(404);
            }
        });

        ws.on('end', () => {
            console.log('Connection ended...');
        });
    }));
}

// Message & WebSocket Functions

function handshake_response(ws, msg) {
    // Handles Handshake Message & Sends Response
    if (check_name(msg.data.username) != 200) {
        return 400;
    };

    if (check_code(msg.data.room_code) != 200) {
        return 400;
    };

    gs = get_game_session_with_code(msg.data.room_code);
    let id = gs.add_player(msg.data.username).PLAYER_ID
    console.log("Player - " + msg.data.username + " - added.");
    ws.send(JSON.stringify(new Message(Types.Player_ID, {
        'player_id': id,
    })));
}

function set_player_avatar(ws, name, avatar) {
    return 200;
}

function check_code(room_code) {
    // Check Client Room Code
    room_code = parseInt(room_code);
    // TODO: Return Proper Data
    if (ACTIVE_ROOMCODES.has(room_code)) {
        return 200;
    } else {
        console.log("Error: Session with Room Code not found!");
        return 404;
    }
}

function check_name(name) {
    // TODO: Check if name is appropriate somehow
    return 200;
}

function get_game_session_with_code(code) {
    for (const value of ACTIVE_GAME_SESSIONS) {
        if (value.room_code == code) {
            return value;
        }
    }
}

// Game Session Functions

async function run_game(type) {
    // Starts a new Game Session
    let gs = new Game_Session(type);
    ACTIVE_GAME_SESSIONS.add(gs);
    let code = gs.start_session(ACTIVE_ROOMCODES)
    ACTIVE_ROOMCODES.add(code);
    return code;
}

exports.run_game = run_game;
exports.ACTIVE_GAME_SESSIONS = ACTIVE_GAME_SESSIONS;
exports.ACTIVE_ROOMCODES = ACTIVE_ROOMCODES;
exports.ws_server = ws_server;