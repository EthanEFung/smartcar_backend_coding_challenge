require('dotenv').config();
require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;
const router = require('./routes/index.js');

app.use(router);

app.listen(port, err => {
  if (err) throw `could not connect on port ${port}:\n${err}`;
  console.log(`listening on port ${port}`);
})