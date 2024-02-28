// Server
const WebSocketServer = require('ws').Server;
const Game_Session = require('./game_session');
const Client = require('./client');
const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types');
const PORT = 3001

// const wss = new WebSocketServer({ port: PORT });
const ACTIVE_GAME_SESSIONS = new Map();
const GAME_SESSION_CLIENTS = new Map();
const ACTIVE_ROOMCODES = new Set();
const CLIENTS = new Map();

class Server {
    constructor() {
        this.wss = new WebSocketServer({ port: PORT });
        this.ws_server();
    }

    async ws_server() {
        this.wss.on('connection', ((ws) => {
            ws.on('message', (message) => {
                let parsed_message = JSON.parse(message)
                let id = parsed_message['session_id']
                let msg = (new Message()).import_data(parsed_message['message']);
                switch (msg.type) {
                    case Types.Handshake:
                        this.handshake_response(ws, id, msg)
                        break;
                    case Types.Avatar:
                        this.set_player_avatar(ws, id, name, avatar)
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

    handshake_response(ws, id, msg) {
        // Handles Handshake Message & Sends Response
        let room_code = parseInt(msg.data.room_code);

        if (this.check_name(msg.data.username) != 200) {
            return 400;
        };
        
        if (this.check_code(room_code) != 200) {
            return 400;
        };
        
        ACTIVE_GAME_SESSIONS.get(room_code).add_player(msg.data.username);
        this.add_client(room_code, id);

        console.log("Player - " + msg.data.username + " - added.");
        ws.send(JSON.stringify(new Message(Types.Player_ID, {
            'STATUS': 200,
        })));
    }

    set_player_avatar(ws, id, name, avatar) {
        return 200;
    }

    check_code(room_code) {
        // Check Client Room Code
        // TODO: Return Proper Data
        if (ACTIVE_ROOMCODES.has(room_code)) {
            return 200;
        } else {
            console.log("Error: Session with Room Code not found!");
            return 404;
        }
    }

    check_name(name) {
        // TODO: Check if name is appropriate somehow
        return 200;
    }

    get_game_session_with_code(code) {
        for (const value of ACTIVE_GAME_SESSIONS) {
            if (value.room_code == code) {
                return value;
            }
        }
    }

    // Game Session Functions

    async run_game(type) {
        // Starts a new Game Session
        this.gs = new Game_Session(type);
        this.code = this.gs.start_session(ACTIVE_ROOMCODES)
        ACTIVE_GAME_SESSIONS.set(this.code, this.gs);
        ACTIVE_ROOMCODES.add(this.code);
        return this.code;
    }

    add_client(room_code, id) {
        if (!GAME_SESSION_CLIENTS.get(room_code)) {
            GAME_SESSION_CLIENTS.set(room_code, new Set());
        }
        GAME_SESSION_CLIENTS.set(room_code, GAME_SESSION_CLIENTS.get(room_code).add(this.get_client(id)));
    }

    get_client(id) {
        if (CLIENTS.has(id)) {
            return CLIENTS.get(id);
        } else {
            let client = new Client(id);
            CLIENTS.set(id, client);
            return client;
        }
    }
}

module.exports = Server;