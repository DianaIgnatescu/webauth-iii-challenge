require('dotenv').config();
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

const secret = process.env.JWT_SECRET || 'there is no secret, it\'s all a lie';

server.get('/', (req, res) => {
  res.send('I\'m ready to partayy!');
});

server.post('/api/register', (req, res) => {
  const { username, password, department } = req.body;
  let user = req.body;
  const hashedPw = bcrypt.hashSync(user.password, 12);
  user.password = hashedPw;
  if (!username || !password || !department) {
    res.status(400).json({ errorMessage: 'Missing username, or password, or department.' })
  } else {
    db('users').insert(user)
      .then(arrayOfIds => {
        return db('users').where({ id: arrayOfIds[0] });
      })
      .then(arrayOfUsers => {
        res.status(201).json(arrayOfUsers[0])
      })
      .catch((error) => {
        res.status(500).json({ errorMessage: 'The user could not be created.' });
      })
  }
});

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };
  const options = {
    expiresIn: '1h'
  };
  const token = jwt.sign(payload, secret, options);
  return token;
};

server.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = req.body;
  if (!username || !password) {
    res.status(400).json({ errorMessage: 'Missing username or password.' });
  } else {
    db('users')
      .where({ username: user.username})
      .first()
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`, token,
          });
        } else {
          res.status(401).json({ message: 'You shall not pass!'});
        }
      })
      .catch((error) => {
        res.status(500).json({ errorMessage: 'Login unsuccessful' })
      });
  }
});

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    // is it valid?
    jwt.verify(token, secret, (error, decodedToken) => {
      if(error) {
        // record the event
        res.status(401).json({ errorMessage: 'You are not authorized to touch this!!' })
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'You shall not pass through here!!' });
  }
};

const port = 5000;
server.listen(port, () => console.log(`\n*** Listening on http://localhost: ${port}! ***\n`));
