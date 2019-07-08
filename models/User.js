const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { // by Gmail
    type: String,
    required: true
  },
  lastName: { // by Gmail
    type: String,
    required: true
  },
  email: { // by Gmail
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  superviser: {
    type: String,
    required: true
  },
  profilePicture: String, // by Gmail
  skills: [String],
  devBudget: Number, // by HR admin
  favBookmarks: Schema.Types.ObjectId
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
