// Client
const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types')
let WebSocket = require('ws');
let ws;

async function create_ws(request) {
    ws = new WebSocket("ws://127.0.0.1:3001");

    ws.on('open', (event) => {
        // Initial Server Request
        ws.send(JSON.stringify(new Message(Types.Handshake, {
            'room_code': request.ROOMCODE,
            'username': request.USERNAME
        })));
    });

    ws.on('message', (message) => {
        // TODO: Message Handling
        console.log(`Message: ${message}`);

        // let msg = (new Message()).import_data(message);
        // switch (msg.type) {
        //     case Types.Avatar:
                
        //         break;
        //     default:
        //         console.log(404);
        // }
    });

    ws.on('error', (err) => {
        console.log('err: ', err);
    });

    ws.on('close', () => {
        console.log("Connection is closed...");
    });
}


async function send_avatar_selection(request) {
    ws.send(JSON.stringify(new Message(Types.Avatar, {
        'avatar_id': request.AVATAR_ID
    })));
}


exports.create_ws = create_ws;
exports.send_avatar_selection = send_avatar_selection;
