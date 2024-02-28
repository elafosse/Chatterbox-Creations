const express = require('express');
const session = require('express-session')
const routes = require('./modules/routes');
const app = express();
const port = 8080;
process.env.PWD = process.cwd()

const middleware = session({
  secret: 'my-secret',  // a secret string used to sign the session ID cookie
  // resave: false,  // don't save session if unmodified
  // saveUninitialized: false  // don't create session until something stored
})

// Front End
app.set('view engine', 'ejs');
app.use(middleware);
app.use(routes);

app.listen(port, () => {
  console.log('App listening on port http://127.0.0.1:' + port)
});
