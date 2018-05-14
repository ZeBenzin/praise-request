const http = require("http");
const app = require("./server");
const io = require("socket.io");

const server = http.createServer(app);

const socket = io(server);

socket.on("connection", client => {
  client.emit("You are connected sir!");
});

server.listen(3001, () => {
  console.log("listening on port 3001");
});
