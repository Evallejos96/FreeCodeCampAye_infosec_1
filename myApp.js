const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));
app.disable('strict-transport-security');

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

module.exports = app;
