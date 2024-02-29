// Client
const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types')
let WebSocket = require('ws');

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
            this.send_handshake(request);
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
    recieve_msg() {
        return new Promise((resolve, reject) => this.ws_message(resolve, reject));
    }

    ws_message(resolve, reject) {
        this.ws.on('message', (message) => {
            let msg = (new Message()).import_data(JSON.parse(message));

            switch (msg.type) {
                case Types.Player_ID:
                    player_id = msg.data.player_id;
                    console.log(player_id);
                    console.log(`Message: ${message}`);
                    break;
                case Types.Success:
                    resolve(msg['STATUS']);
                    break;
                default:
                    reject();
                    console.log(404);
            }
        });
    }

    async send_message_to_server(msg) {
        this.ws.send(JSON.stringify({
            'session_id': this.session_id,
            'message': msg
        }));
    }

    async send_handshake(request) {
        // Initial Server Request
        this.send_message_to_server(new Message(Types.Handshake, {
            'room_code': request.ROOMCODE,
            'username': request.USERNAME
        }));
    }

    async send_avatar_selection(request) {
        this.send_message_to_server(new Message(Types.Avatar, {
            'avatar_id': request.AVATAR_ID
        }))
    }
}

module.exports = Client;