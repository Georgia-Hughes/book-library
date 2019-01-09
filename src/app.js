const express = require('express');
const app = express();
const user = require('./controllers/userController');


app.use(express.json());
app.post('/users', user.create);

module.exports = app;
