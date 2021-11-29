const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const easy = require('./server.js');

require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)

const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.json());

app.use(easy);

app.listen(5000);
