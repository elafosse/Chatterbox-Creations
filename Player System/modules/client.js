// Client
const Message = require('../../Utils/messages')
const Types = require('../../Utils/message_types')
var WebSocket = require('ws');

function create_ws(request) {
    var ws = new WebSocket("ws://127.0.0.1:3001");

    ws.on('open', (event) => {
        // Initial Server Request
        ws.send(JSON.stringify(new Message(Types.Handshake, {
            'room_code': request.ROOMCODE,
            'username': request.USERNAME
        })));
    });

    ws.on('error', (err) => {
        console.log('err: ', err);
    });
    
    ws.on('message', (message) => {
        // TODO: Message Handling
        console.log(`Message: ${message}`);
    });
    
    ws.on('close', () => {
        console.log("Connection is closed...");
    });
}
  

module.exports = create_ws;
