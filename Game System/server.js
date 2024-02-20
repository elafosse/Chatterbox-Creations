// Server
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', ((ws) => {
    ws.on('message', (message) => {
        console.log(`received: ${message}`);
        ws.send("Hello Client");
    });

    ws.on('end', () => {
        console.log('Connection ended...');
    });
}));


