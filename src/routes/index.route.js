const channelRoute = require('../routes/channel.route');

function route(app) {
  app.use('/channels', channelRoute);
}

module.exports = route;
