// Server
const WebSocketServer = require('ws').Server;
const Game_Session = require('./game_session');
const Client = require('./client');
const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types');
const Utils = require('../../Utils/utils');
const PORT = 3001

const ACTIVE_GAME_SESSIONS = new Map();
const GAME_SESSION_CLIENTS = new Map();
const PLAYER_GAME_SESSION = new Map();
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
                let command_status = 200;
                let parsed_message = JSON.parse(message)
                let id = parsed_message['session_id']
                let msg = (new Message()).import_data(parsed_message['message']);

                switch (msg.type) {
                    case Types.Handshake:
                        command_status = this.handshake_response(id, msg)
                        break;
                    case Types.Avatar:
                        command_status = this.set_player_avatar(id, msg)
                        break;
                        default:
                            console.log(404);
                }

                if (command_status != 200) {
                    Utils.send_error(ws, command_status);
                } else {
                    Utils.send_success(ws, command_status);
                }
            });

            ws.on('end', () => {
                console.log('Connection ended...');
            });
        }));
    }

    // Message & WebSocket Functions

    handshake_response(id, msg) {
        // Handles Initial Handshake Message & Sends Response
        let room_code = parseInt(msg.data.room_code);

        let ret = this.check_name(msg.data.username);
        if (ret != 200) {
            return ret;
        };

        ret = this.check_code(room_code);
        if (ret != 200) {
            return ret;
        };
        
        ret = ACTIVE_GAME_SESSIONS.get(room_code).add_player(msg.data.username, id);
        if (ret != 200) {
            return ret;
        };

        PLAYER_GAME_SESSION.set(id, room_code);
        this.add_client(room_code, id);

        console.log("Player - " + msg.data.username + " - added.");
        return ret;
    }

    set_player_avatar(id, avatar) {
        // Sets the Players Avatar
        return ACTIVE_GAME_SESSIONS.get(PLAYER_GAME_SESSION.get(id)).set_player_avatar(id, avatar.data.avatar_id);
    }

    check_code(room_code) {
        // Checks if Client Room Code Correspondes to a Real Game Session Code
        if (ACTIVE_ROOMCODES.has(room_code)) {
            return 200;
        } else {
            console.log("Error: Session with Room Code not found!");
            return 404;
        }
    }

    check_name(name) {
        // Checks if Name is Appropriate
        if (Utils.name_appropriate(name)) {
            return 200;
        } else {
            return 400;
        }
    }

    get_game_session_with_code(code) {
        for (const value of ACTIVE_GAME_SESSIONS) {
            if (value.room_code == code) {
                return value;
            }
        }
    }

    // send_to_client() {

    // }

    // Game Session Functions

    async run_game(type) {
        // Starts a new Game Session
        this.gs = new Game_Session(type);
        this.code = this.gs.start_session(ACTIVE_ROOMCODES)
        ACTIVE_GAME_SESSIONS.set(this.code, this.gs);
        ACTIVE_ROOMCODES.add(this.code);
        return this.code;
    }

    start_gs(code) {
        // TODO: Start game if not started yet
        ACTIVE_GAME_SESSIONS.get(parseInt(code)).start_game();
        // TODO: Tell Clients to Start Game
        
    }

    add_client(room_code, id) {
        if (!GAME_SESSION_CLIENTS.get(room_code)) {
            GAME_SESSION_CLIENTS.set(room_code, new Set());
        }
        let client = this.get_client(id)
        client.game = ACTIVE_GAME_SESSIONS.get(room_code).game;
        GAME_SESSION_CLIENTS.set(room_code, GAME_SESSION_CLIENTS.get(room_code).add(client));
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