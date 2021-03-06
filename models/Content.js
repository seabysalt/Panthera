const mongoose = require("mongoose")
const { Schema } = mongoose


const contentSchema = new Schema({
    article: Object,
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    likingUserPic: [String]
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
const Content = mongoose.model("content", contentSchema);

module.exports = Content;