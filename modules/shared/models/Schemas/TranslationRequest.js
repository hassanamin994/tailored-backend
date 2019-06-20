const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TranslationRequestSchema = new Schema({
    article: { type: Schema.Types.ObjectId, ref: 'article' },
    organization: { type: Schema.Types.ObjectId, ref: 'organization' },
    targetLanguage: { type: String },
    published: { type: Boolean, default: false },
});

module.exports = { TranslationRequestSchema };