const express = require('express');
const app = express();
const { postFormController } = require('./controllers/postFormController');

// middleware to handle json
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', postFormController);

module.exports = app;
