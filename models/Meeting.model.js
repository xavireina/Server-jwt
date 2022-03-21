const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const meetingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  users: {
    type: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    default: [],
  },
});

module.exports = model('Meeting', meetingSchema);
