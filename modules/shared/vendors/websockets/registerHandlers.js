function registerHandlers(socket, handlers) {
  handlers.forEach((handler) => {
    socket.on(handler.event, handler.handler(socket));
  });
}

module.exports = {
  registerHandlers,
}