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

// Client
var WebSocket = require('ws');
console.log('open: ');
var ws = new WebSocket("ws://127.0.0.1:3001");
ws.onopen = function (event) {
    console.log('Connection is open ...');
    ws.send("Hello Server");
};

ws.onerror = function (err) {
    console.log('err: ', err);
}

ws.onmessage = function (event) {
    console.log(event.data);
};

ws.onclose = function() {
    console.log("Connection is closed...");
}

app.listen(8081);
console.log('Server is listening on port 8081');