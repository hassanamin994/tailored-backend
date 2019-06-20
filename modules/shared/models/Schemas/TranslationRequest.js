const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { SchemaNames } = require('./utils/schemaNames');

const TranslationRequestSchema = new Schema({
    article: { type: Schema.Types.ObjectId, ref: SchemaNames.article },
    organization: { type: Schema.Types.ObjectId, ref: SchemaNames.organization },
    targetLanguage: { type: String },
    published: { type: Boolean, default: false },
});

module.exports = { TranslationRequestSchema };