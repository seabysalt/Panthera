const mongoose = require("mongoose")
const { Schema } = mongoose


const contentSchema = new Schema({
    // title: String,
    // author: String,
    // source: String,
    // urlToImage: String,
    // description: String,
    // url: String,
    article: Object,
    likedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
const Content = mongoose.model("content", contentSchema);

module.exports = Content;