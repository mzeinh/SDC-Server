require('dotenv').config({ path: '../db_cred.env' });
const express = require('express');
const router = require('./routes');
const db = require('./database/index');

const app = express();
app.use(express.json());
app.use('/', router);
app.listen(3000);
module.exports.app = app;
