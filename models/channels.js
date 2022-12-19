const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;
const channelSChema = new Schema({
  channelID: ObjectID,
  title: String,
});

// const Channel = mongoose.model("channel", channelSChema);
// module.exports = Channel;
