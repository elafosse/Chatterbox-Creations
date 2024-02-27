// Client
const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types')
let WebSocket = require('ws');
let sockets = new Map();



async function create_ws(id, request) {
    let ws = new WebSocket("ws://127.0.0.1:3001");
    sockets.set(id, ws);

    ws.on('open', (event) => {
        // Initial Server Request
        ws.send(JSON.stringify(new Message(Types.Handshake, {
            'room_code': request.ROOMCODE,
            'username': request.USERNAME
        })));
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
}

async function send_avatar_selection(id, request) {
    ws.send(JSON.stringify(new Message(Types.Avatar, {
        'avatar_id': request.AVATAR_ID
    })));
}

exports.create_ws = create_ws;
exports.send_avatar_selection = send_avatar_selection;
