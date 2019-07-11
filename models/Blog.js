const mongoose = require("mongoose")
const { Schema } = mongoose


const blogSchema = new Schema({
    title: String,
    author: String,
    authorPic: String,
    urlToImage: String,
    description: String,
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
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;