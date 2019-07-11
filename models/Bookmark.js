const mongoose = require("mongoose")
const { Schema } = mongoose


const bookmarkSchema = new Schema({
    // title: String,
    // author: String,
    // source: String,
    // urlToImage: String,
    // description: String,
    // url: String,
    article: Object,
    bookmarkedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
const Bookmark = mongoose.model("bookmark", bookmarkSchema);

module.exports = Bookmark;