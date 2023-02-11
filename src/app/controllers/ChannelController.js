const Channel = require('../models/Channel');

class ChannelController {
  //[GET] //load channels  /channels/load
  load(req, res, next) {
    Channel.find({ userId: req.body.userId })
      .then(channels => {
        console.log('load done!');
        res.json(channels);
      })
      .catch(err => {
        res.json({
          load: 'error',
          message: err,
        });
      });
  }

  //[POST] //add channels /channels/add
  add(req, res, next) {
    const newChannel = req.body;
    console.log('newChannel', newChannel);
    Channel.create(newChannel)
      .then(newdata => {
        console.log('added!', newdata);
        res.json({
          added: 'done',
          channel: newdata,
        });
      })
      .catch(err => {
        res.json({
          add: 'error',
          message: err,
        });
      });
  }

  //[DELTE] //delete channels /channels/:channelId
  delete(req, res, next) {
    const channelId = req.params.channelId;
    console.log('deleting: ', channelId);
    Channel.delete({ channelId: channelId })
      .then(() => {
        console.log('deleted!');
        res.json({ deleted: 'done' });
      })
      .catch(err => {
        res.json({
          deleted: 'error',
          message: err,
        });
      });
  }
}

module.exports = new ChannelController();
