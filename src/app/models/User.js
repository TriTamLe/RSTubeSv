const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullname: {
      type: String,
      require: true,
      maxLength: 100,
    },
    email: {
      type: String,
      require: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

module.exports = mongoose.model('users', User);
