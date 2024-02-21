const express = require('express');
const routes = require('./modules/routes');
const app = express();
const port = 8081;
process.env.PWD = process.cwd()

// Front End
app.set('view engine', 'ejs');
app.use(routes)

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}`)
});
