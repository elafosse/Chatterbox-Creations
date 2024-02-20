// Client
const Message = require('../Utils/messages')
const Types = require('../Utils/message_types')
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
        console.log(`Message: ${message}`);
    });
    
    // ws.onmessage = function (event) {
    //     console.log(event.data);
    // };
    
    ws.on('close', () => {
        console.log("Connection is closed...");
    });
}
  



// const server = requi+re('http').createServer();
// const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//   console.log('a user connected');

//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });


// const express = require('express');
// const routes = require('./routes');
// const app = express();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// const port = process.env.PORT || 8081;

// process.env.PWD = process.cwd()



// // set the view engine to ejs
// app.set('view engine', 'ejs');
// app.use(routes)

// io.on('connection', (socket) => {
//   console.log('user connected');
//   socket.on('disconnect', function () {
//     console.log('user disconnected');
//   });
// })

// server.listen(port, function() {
//   console.log(`Listening on port ${port}`);
// });


// function connect_to_server(app) {
//     var server = require('http').createServer(app);
//     var io = require('socket.io')(server);

// }
// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

// io.on('connection', function(client) {
//     console.log('Client connected...');
    
//     client.on('join', function(data) {
//         console.log(data);
//     });

// });

module.exports = create_ws;
