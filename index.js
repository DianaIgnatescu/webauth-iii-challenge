const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');
const knexConfig = require('./knexfile').development;

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
  res.send('I\'m ready to partayy!');
});


const port = 5000;
server.listen(port, () => console.log(`\n*** Listening on http://localhost: ${port}! ***\n`));
