const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SLIDE_STATUS_ENUMS = ['processing', 'done'];
const ARTICLE_TYPE_ENUM = ['original', 'translation'];

const MediaSchema = new Schema({
    url: { type: String },
    duration: { type: String },
});

const SlideSchema = new Schema({
    text: { type: String },
    audio: { type: String },
    medias: [MediaSchema],
    video: { type: String },
    position: { type: Number },
    duration: { type: Number },
    status: { type: String, enum: SLIDE_STATUS_ENUMS, default: 'done' },
    commentsThread: { type: Schema.Types.ObjectId, ref: 'commentsThread' },
});

const ArticleSchema = new Schema({
    title: { type: String },
    version: { type: Number, default: 1 },
    slides: [SlideSchema],
    video: { type: Schema.Types.ObjectId, ref: 'video' },
    commentsThread: { type: Schema.Types.ObjectId, ref: 'commentsThread' },
    /* 
        language field is the original language of the video
        when someone clones the article to translate it,
        this field should be set to be the target
        language
    */
    language: { type: String },
    organization: { type: Schema.Types.ObjectId, ref: 'organization' },
    articleType: { type: String, enum: ARTICLE_TYPE_ENUM, default: 'original' },
    // special fields for translation articleType
    translationProgress: { type: Number, default: 0 },
    originalArticle: { type: Schema.Types.ObjectId, ref: 'article' },
    // the user who cloned the article to translate it
    translator: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = { ArticleSchema, SlideSchema, MediaSchema };
