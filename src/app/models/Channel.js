const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Channel = new Schema(
  {
    channelId: String,
    title: String,
  },
  {
    collection: 'channels',
    timestamps: true,
  },
);

Channel.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('channel', Channel);
