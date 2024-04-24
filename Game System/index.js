require('dotenv').config();
const express = require('express');
const session = require('express-session');
const routes = require('./modules/routes');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const app = express();
const port = process.env.PORT || 8080;
const secret = process.env.SECRET_KEY || 'default-secret';
const redisClient = redis.createClient();
process.env.PWD = process.cwd()

const middleware = session({
  secret: secret,
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({ client: redisClient }),
})


// Front End
app.disable("x-powered-by");
app.set('view engine', 'ejs');
app.use(express.static('static'))
app.use(middleware);
app.use(routes);

app.listen(port, () => {
  console.log('App listening on port http://127.0.0.1:' + port)
});
