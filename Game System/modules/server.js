// Server
const Game_Session = require('./game_session');
const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types');
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 3001 });

var ACTIVE_GAME_SESSIONS = new Set([]);
var ACTIVE_ROOMCODES = new Set([]);

function ws_server() {
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
}

async function run_game(type) {
    // Starts a new Game Session
    var gs = new Game_Session(type);
    ACTIVE_GAME_SESSIONS.add(gs);
    ACTIVE_ROOMCODES.add(gs.start_session(ACTIVE_ROOMCODES));
}

function handshake_response(ws, msg) {
    // Handles Handshake Message & Sends Response
    console.log(check_code(parseInt(msg.data.room_code)));
    ws.send("Hello " + msg.data.username);
}

function check_code(room_code) {
    // Check Client Room Code
    // TODO: Return Proper Data
    if (ACTIVE_ROOMCODES.has(room_code)) {
        return 200;
    } else {
        console.log("Error: Session with Room Code not found!");
        return 404;
    }
}

exports.run_game = run_game;
exports.ACTIVE_GAME_SESSIONS = ACTIVE_GAME_SESSIONS;
exports.ACTIVE_ROOMCODES = ACTIVE_ROOMCODES;
exports.ws_server = ws_server;