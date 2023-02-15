const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Channel = new Schema(
  {
    channelId: {
      type: String,
      require: true,
      unique: true,
    },
    title: {
      type: String,
    },
  },
  {
    collection: 'channels',
    timestamps: true,
  },
);

module.exports = mongoose.model('channel', Channel);
