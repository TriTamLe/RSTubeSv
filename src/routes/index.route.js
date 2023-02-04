const channelRoute = require('./channel.route');
const userRoute = require('./user.route');

function route(app) {
  app.use('/channels', channelRoute);
  app.use('/user', userRoute);
}

module.exports = route;
