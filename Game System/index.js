const express = require('express');
const routes = require('./routes');
const server = require('./server');
const app = express();
const port = 8080;
process.env.PWD = process.cwd()

// Front End
app.set('view engine', 'ejs');
app.use(routes)

// Back End
server

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}`)
});
