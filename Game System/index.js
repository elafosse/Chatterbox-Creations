const express = require('express');
const routes = require('./modules/routes');
const ws_server = require('./modules/server').ws_server;
const app = express();
const port = 8080;
process.env.PWD = process.cwd()

// Front End
app.set('view engine', 'ejs');
app.use(routes)

// Back End
ws_server()

app.listen(port, () => {
  console.log('App listening on port http://127.0.0.1:' + port)
});
