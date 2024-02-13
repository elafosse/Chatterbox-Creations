var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// At the top of your server.js
process.env.PWD = process.cwd()

// Then
app.use(express.static(process.env.PWD + '/static'));

// use res.render to load up an ejs view file

// index page
app.get('/', (req, res) => {
  res.render('pages/index');
});

// about page
app.get('/about', (req, res) => {
  res.render('pages/about');
});

// Server
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', ((ws) => {
    ws.on('message', (message) => {
    console.log(`received: ${message}`);
});
ws.on('end', () => {
    console.log('Connection ended...');
    });
    ws.send('Hello Client');
}));

app.listen(8080);
console.log('Server is listening on port 8080');