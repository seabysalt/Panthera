const mongoose = require("mongoose")
const { Schema } = mongoose


const userSchema = new Schema({
  facebookId: String, //by Facebook from Pierre
  firstName: { // by Gmail
    type: String,
    // required: true
  },
  lastName: { // by Gmail
    type: String,
    // required: true
  },
  fullName: String, //by Facebook from Pierre
  email: { // by Gmail
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
  interests: {
    type: [String],
    default: 'Music'
    // enum: possibleInterests,
  },
  websites: {
    type: [String]
    // enum: possibleInterests,
  },
  // role: {
  //   type: String,
  // },
  // supervisor: {
  //   type: String,

  // },
  username: String,

  profilePicture: {
    type: String, // by Gmail
    default: 'https://static.thenounproject.com/png/66853-200.png'
  },
  skills: [String],
  devBudget: Number, // by HR admin
  favBookmarks: Schema.Types.ObjectId
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
const User = mongoose.model("User", userSchema);

module.exports = User;