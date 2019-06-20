const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CONVERT_STATUS_ENUM = ['uploading', 'transcriping', 'proofreading', 'converting', 'done'];

const VideoSchema = new Schema({
    url: { type: String },
    transcripingProgress: { type: Number, default: 0 },
    convertingProgress: { type: Number, default: 0 },
    status: { type: String, enum: CONVERT_STATUS_ENUM, default: 'uploading' },
})

module.exports = { VideoSchema };