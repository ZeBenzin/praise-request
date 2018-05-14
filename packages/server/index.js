const http = require("http");
const app = require("./server");
const io = require("socket.io");
const socketMap = require("./socket-map");

const server = http.createServer(app);

const socket = io(server);

socket.on("connection", socket => {
  // const token = socket.handshake.query.jwt;
  // if (token) {
  //   // validate the token
  //   if (/* token is valid */) {
  //     // user is logged in so...
  //   }
  // }
  socketMap[socket.handshake.query.userId] = socket;
  socket.emit("connection", 150);
});

server.listen(3001, () => {
  console.log("listening on port 3001");
});
