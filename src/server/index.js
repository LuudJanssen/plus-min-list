import gulp from 'gulp';
import tap from 'gulp-tap';

/**
 * Start an instance of the PlusMinServer. This includes building the client, setting the watchers and registering the APIs.
 *
 * @param {PlusMinServer} server The PlusMinServer instance to start.
 */
function startServer(server) {
  server.buildClient();
  server.start();
}

/**
 * Start a new server.
 */
function newServer() {
  if (fileWatcher) {
    fileWatcher.stopWatching();
  }

  if (watch) {
    watch.end();
  }

  /**
   * Don't try this at home kids. We use gulp to get all watched files and invalidate their require cache.
   */
  watch = gulp.src(['src/server/**/*.*', '!src/server/index.js'])
    .pipe(tap(function (file) {
      delete require.cache[
        require.resolve(
          file.path.replace(__dirname, '.')
        )];
    }));

  /**
   * We need default because we're doing some hacky thing with Babel and
   * deleting the require cache.
   */
  let PlusMinServer = require('./PlusMinServer').default;
  let FileWatcher = require('./FileWatcher').default;
  let Logger = require('./logger').default;

  let logger = new Logger('Server');

  logger.info('Setting up new server');

  let serverInstance = new PlusMinServer();
  fileWatcher = new FileWatcher(serverInstance);
  fileWatcher.registerReload(newServer);

  startServer(serverInstance);
}

let fileWatcher;
let watch;
newServer();
