// Client
const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types')
let WebSocket = require('ws');
let sockets = new Map();

class Client {
    constructor(id) {
        this.set_session_id(id);
    }

    // Setters & Getters
    get_session_id() {
        return this.session_id;
    }

    set_session_id(value) {
        this.session_id = value;
    }

    // Connection Functions
    async create_ws(request) {
        // TODO: Increment Port Numbers?
        let ws = new WebSocket("ws://127.0.0.1:3001");

        ws.on('open', (event) => {
            // Initial Server Request
            this.send_message_to_server(new Message(Types.Handshake, {
                'room_code': request.ROOMCODE,
                'username': request.USERNAME
            }));
        });

        ws.on('message', (message) => {
            let msg = (new Message()).import_data(message);
            switch (msg.type) {
                case Types.Player_ID:
                    player_id = msg.data.player_id;
                    console.log(player_id);
                    console.log(`Message: ${message}`);
                    break;
                default:
                    console.log(404);
            }
        });

        ws.on('error', (err) => {
            console.log('err: ', err);
        });

        ws.on('close', () => {
            console.log("Connection is closed...");
        });

        this.ws = ws;
    }

    // Message Functions
    async send_message_to_server(msg) {
        this.ws.send(JSON.stringify({
            'session_id': this.session_id,
            'message': msg
        }));
    }

    async send_avatar_selection(request) {
        this.send_message_to_server(new Message(Types.Avatar, {
            'avatar_id': request.AVATAR_ID
        }))
    }
}

module.exports = Client;