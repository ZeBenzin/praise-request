const http = require( "http");
const app = require( "./server");

const server = http.createServer(app);

server.listen(3001, () => {
  console.log("listening on port 3001");
});
