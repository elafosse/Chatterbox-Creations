const express = require('express');
const session = require('cookie-session');
const routes = require('./modules/routes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const secret = process.env.SECRET_KEY || 'default-secret';
process.env.PWD = process.cwd()

const middleware = session({
  secret: secret,
  resave: true,
  saveUninitialized: true
})

// Front End
app.disable("x-powered-by");
app.set('view engine', 'ejs');
app.use(express.static('static'))
app.use(middleware);
app.use(routes);

app.listen(port, '0.0.0.0', () => {
  console.log('App listening on port http://127.0.0.1:' + port)
});
