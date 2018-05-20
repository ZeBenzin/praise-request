const io = require("socket.io");
const socketMap = require("../socket-map");
const ostService = require("./ost-service");
const auth = require("../api/auth");

const initialise = server => {
  const socket = io(server);

  socket.on("connection", socket => {
    console.log("connected");
    const token = socket.handshake.query.jwt;
    let req;
    if (token) {
      req = { headers: { authorization: token } };
      auth.decodeToken(req, null, () => {
        if (req.user) {
          socketMap[req.user.ostId] = { socket, ghUserId: req.user.id };
          ostService.getUser({ id: req.user.ostId }).then(({ data }) => {
            socket.emit("balance", data.data.users[0].token_balance);
          });
        }
      });
    }

    socket.on("disconnect", () => {
      if (req && req.user) {
        delete socketMap[req.user.ostId];
      }
    });
  });
};

module.exports = { initialise };
