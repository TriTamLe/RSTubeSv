const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const Channel = require('./Channel');

const Board = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },

    title: {
      type: String,
      length: 100,
      require: true,
      unique: true,
    },

    channelIds: {
      type: [
        {
          channelId: { type: Schema.Types.Array, ref: 'channels' },
        },
      ],
      default: undefined,
    },
  },
  {
    collection: 'boards',
    timeseries: true,
  },
);

Board.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('board', Board);
