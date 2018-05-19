const http = require("http");
const app = require("./server");
const io = require("socket.io");
const socketMap = require("./socket-map");
const auth = require("./api/auth");
const controller = require("./api/resources/transaction/controller");

const server = http.createServer(app);

const socket = io(server);

socket.on("connection", socket => {
  const token = socket.handshake.query.jwt;
  let req;
  if (token) {
    req = { headers: { authorization: token } };
    auth.decodeToken(req, null, () => {
      if (req.user) {
        socketMap[req.user.id] = socket;
      }
    });
  }

  socket.on("disconnect", () => {
    if (req && req.user) {
      delete socketMap[req.user.id];
    }
  });

  socket.emit("connection", 150);
});

server.listen(3001, () => {
  console.log("listening on port 3001");
});
