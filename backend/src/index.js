const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    // console.log('here :', jwt.verify(token, process.env.APP_SECRET));
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // console.log(userId);
    req.userId = userId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
    port: 4444,
  },
  deets => {
    console.log(deets);
    console.log(`Server is running on port https://localhost:${deets.port}`);
  }
);

module.exports = server;
