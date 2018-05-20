const http = require("http");
const app = require("./server");
const socketService = require("./utils/socket-service");

const server = http.createServer(app);
socketService.initialise(server);

server.listen(3001, () => {
  console.log("listening on port 3001");
});
