const mongoose = require('mongoose');
async function connect() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://localhost:27017/RSTube');
    console.log('Connected to database');
  } catch (error) {
    console.log('Connecting failed!', error);
  }
}

module.exports = { connect };
