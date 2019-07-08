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
    // default: url("https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi785Cw1qXjAhXR1qQKHVGvBcwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.pinclipart.com%2Fpindetail%2FoJxomi_person-svg-png-icon-free-download-profile-icon%2F&psig=AOvVaw3Rijl-CnZuF1tTv2CWk34i&ust=1562687381688092")
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