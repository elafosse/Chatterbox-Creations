const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types')
let WebSocket = require('ws');

// Class Representing Client (Player). Allows Messsage Exchange Between Clients & Server
class Client {
    current_player = false;

    constructor(id) {
        this.session_id = id;
    }

    // Connection Functions

    async create_connection_with_server(request) {
        // Creates Connection To Server
    
        // TODO: Change When Hosting?
        let ws = new WebSocket("ws://127.0.0.1:3001");

        ws.on('open', (event) => {
            // Initial Server Request
            this.send_handshake(request);
        });

        ws.on('error', (err) => {
            // TODO: Complete?
            console.log('err: ', err);
        });

        ws.on('close', () => {
            // TODO: Complete?
            console.log("Connection is closed...");
        });

        this.ws = ws;
    }

    // Message Functions

    recieve_msg() {
        // Accepts Message From Server
        // TODO: Combine With Send Message?
        return new Promise((resolve, reject) => this.ws_message(resolve, reject));
    }

    ws_message(resolve, reject) {
        this.ws.on('message', (message) => {
            let msg = (new Message()).import_data(JSON.parse(message));

            switch (msg.type) {
                case Types.Success:
                    resolve(msg['STATUS']);
                    break;
                default:
                    reject();
            }
        });
    }

    async send_message_to_server(msg) {
        // Sends Message To Server
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
        // Client Avatar Selection Sent To Server
        this.send_message_to_server(new Message(Types.Avatar, {
            'avatar_id': request.AVATAR_ID
        }))
    }

    // Jeopardy Functions

    async send_category_selection(request) {
        // Client Jeopardy Category Selection Sent To Server
        this.send_message_to_server(new Message(Types.Category, {
            'category': request.CATEGORY
        }))
    }

    async send_amount_selection(request) {
        // Client Jeopardy Amount Selection Sent To Server
        this.send_message_to_server(new Message(Types.Amount, {
            'amount': request.AMOUNT
        }))
    }
}

module.exports = Client;