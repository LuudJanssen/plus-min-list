function startServer(server) {
  server.buildClient();
  server.setWatchers();
  server.start();
  server.registerRestart(newServer);
}

function newServer() {
  delete require.cache[require.resolve('./PlusMinServer')];
  let PlusMinServer = require('./PlusMinServer');

  /* We need default because we're doing some hacky thing with Babel and
   * deleting the require cache. */
  let serverInstance = new PlusMinServer.default();
  startServer(serverInstance);
}

newServer();
