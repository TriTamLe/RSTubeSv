const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Channel = new Schema(
  {
    channelId: {
      type: String,
      require: true,
      unquie: true,
    },
    title: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
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
