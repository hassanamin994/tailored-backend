const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    text: { type: String },
})

const CommentsThread = new Schema({
    comments: [Comment]
})

module.exports = { Comment, CommentsThread };