// Server
const Message = require('../Utils/messages')
const Types = require('../Utils/message_types')
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 3001 });

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

// Starts Up Game
function start_room() {
    create_roomcode();
    // TODO: Frontend
    ACTIVE_ROOMCODES.add(roomcode)
}

function create_roomcode() {
    // Creates a code for players to join the room
    // TODO: Check valid roomcode created
    var roomcode = Math.floor(Math.random() * 89999) + 1000;
    if (ACTIVE_ROOMCODES.has(roomcode)) {
        return create_roomcode();
    } else {
        return roomcode;
    }
}

function check_code(room_code) {
    // Check Client Room Code
    if (ACTIVE_ROOMCODES.has(room_code)) {
        // TODO: Return Proper Data
        return 5;
    } else {
        return "Error: Session with Room Code not found!";
    }
}

function handshake_response(ws, msg) {
    // Handles Handshake Message & Sends Response
    console.log(check_code(msg.data.room_code));
    ws.send("Hello " + msg.data.username);
}