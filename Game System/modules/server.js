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
const HOST_SESSIONS = new Map();

// Class Representing Server That Runs Chatterbox Creations
class Server {
    constructor() {
        this.wss = new WebSocketServer({ port: PORT });
        this.create_ws_server();
    }

    async create_ws_server() {
        // Creates WebSocket Server 
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
                    case Types.Category:
                        command_status = this.set_category(id, msg);
                        break;
                    case Types.Amount:
                        command_status = this.set_amount(id, msg);
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
                // TODO: Complete?
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
        this.add_client_to_gs_map(room_code, id);

        console.log("Player - " + msg.data.username + " - added.");
        return ret;
    }

    set_player_avatar(id, avatar) {
        // Sets the Players Avatar
        return ACTIVE_GAME_SESSIONS.get(PLAYER_GAME_SESSION.get(id)).set_player_avatar(id, avatar.data.avatar_id);
    }

    // Jeopardy Functions

    set_category(id, msg) {
        // TODO: Complete Function
        ACTIVE_GAME_SESSIONS.get(PLAYER_GAME_SESSION.get(id)).game_api.set_curr_category(msg.data.category);
        return 200;
    }

    set_amount(id, msg) {
        // TODO: Complete Function
        ACTIVE_GAME_SESSIONS.get(PLAYER_GAME_SESSION.get(id)).game_api.set_curr_amount(msg.data.amount);
        return 200;
    }

    // Other Functions

    check_code(room_code) {
        // Checks if Client Room Code Correspondes to a Real Game Session Code
        if (ACTIVE_ROOMCODES.has(room_code)) {
            return 200;
        } else {
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

    // Game Session Functions

    async init_game_session(type, id) {
        // Starts a new Game Session
        let gs = new Game_Session(type);
        let code = gs.init_session(ACTIVE_ROOMCODES)
        ACTIVE_GAME_SESSIONS.set(code, gs);
        ACTIVE_ROOMCODES.add(code);
        HOST_SESSIONS.set(this.get_client(id).session_id, gs)
        return code;
    }

    async start_game_session(id) {
        // Starts the Game
        return HOST_SESSIONS.get(id).start_game();
    }

    check_if_client_game_started(client_id) {
        // Checks if Game Has Started
        return ACTIVE_GAME_SESSIONS.get(PLAYER_GAME_SESSION.get(client_id)).started;
    }

    check_response(client_id, response) {
        // Checks if Response Is Correct
        return ACTIVE_GAME_SESSIONS.get(PLAYER_GAME_SESSION.get(client_id)).check_response(client_id, response);

    }

    // Client Functions

    get_client(id) {
        // Creates or Returns Existing Client
        if (CLIENTS.has(id)) {
            return CLIENTS.get(id);
        } else {
            let client = new Client(id);
            CLIENTS.set(id, client);
            return client;
        }
    }

    add_client_to_gs_map(room_code, id) {
        // Adds Client To Game Session List
        if (!GAME_SESSION_CLIENTS.get(room_code)) {
            GAME_SESSION_CLIENTS.set(room_code, new Set());
        }
        let client = this.get_client(id)
        client.game = ACTIVE_GAME_SESSIONS.get(room_code).game;
        GAME_SESSION_CLIENTS.set(room_code, GAME_SESSION_CLIENTS.get(room_code).add(client));
    }

    check_if_client_turn(client_id) {
        // Checks if it is Currently the Users Turn
        let gs = ACTIVE_GAME_SESSIONS.get(PLAYER_GAME_SESSION.get(client_id));
        if (client_id == gs.get_current_turn_player().id) {
            return 200;
        } else {
            return 400;
        };
    }

    // Host Functions

    async check_current_host_state(id) {
        // Returns Information On What Host Should Currently Display
        return HOST_SESSIONS.get(id).host_screen_change();
    }
}

module.exports = Server;