const http = require("http");
const app = require("./server");
const io = require("socket.io");
const socketMap = require("./socket-map");
const auth = require("./api/auth");

const server = http.createServer(app);

const socket = io(server);

socket.on("connection", socket => {
  const token = socket.handshake.query.jwt;
  if (token) {
    const req = { headers: { authorization: token } };
    auth.decodeToken(req, null, () => {
      if (req.user) {
        socketMap[req.user.id] = socket;
      }
    });
  }

  socket.on("disconnect", () => {
    if (req.user) {
      delete socketMap[req.user.id];
    }
  });

  socket.emit("connection", 150);
});

server.listen(3001, () => {
  console.log("listening on port 3001");
});
