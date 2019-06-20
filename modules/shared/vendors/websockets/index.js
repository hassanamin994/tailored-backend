const io = require('socket.io');

let socketConnection;
const createSocketConnection = function(server, options = {}) {
  socketConnection = io(server, options);
  return socketConnection;
}

module.exports = {
  socketConnection,
  createSocketConnection,
}