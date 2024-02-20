// Server
const Game_Session = require('./game_session');
const Message = require('../Utils/messages')
const Types = require('../Utils/message_types')
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 3001 });

var ACTIVE_GAME_SESSIONS = new Set([]);
var ACTIVE_ROOMCODES = new Set([]);

wss.on('connection', ((ws) => {
    ws.on('message', (message) => {
        var msg = (new Message()).import_data(message);
        switch (msg.type) {
            case Types.Handshake:
                handshake_response(ws, msg)
                break;
            default:
                console.log(404);
        }
    });

    ws.on('end', () => {
        console.log('Connection ended...');
    });
}));

function run_game(type) {
    var gs = new Game_Session(type);
    ACTIVE_GAME_SESSIONS.add(gs);
    ACTIVE_ROOMCODES.add(gs.start_session());
}

function handshake_response(ws, msg) {
    // Handles Handshake Message & Sends Response
    console.log(check_code(msg.data.room_code));
    ws.send("Hello " + msg.data.username);
}

function check_code(room_code) {
    // TODO: Move outside of game_session class
    // Check Client Room Code
    if (ACTIVE_ROOMCODES.has(room_code)) {
        // TODO: Return Proper Data
        return 5;
    } else {
        return "Error: Session with Room Code not found!";
    }
}