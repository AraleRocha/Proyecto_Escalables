require('dotenv').config();

const Server = require("./config/server.js");
const server = new Server();

server.listen();
