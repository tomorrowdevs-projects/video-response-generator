const express = require('express');
const app = express();
const PORT = 3000;
const { postFormController } = require('./controllers/postFormController');

// middleware to handle json
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', postFormController);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

module.exports = app;
