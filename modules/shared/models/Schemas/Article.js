const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { SchemaNames } = require('./utils/schemaNames');

const SLIDE_STATUS_ENUMS = ['processing', 'done'];
const ARTICLE_TYPE_ENUM = ['original', 'translation'];
const MEDIA_TYPES_ENUM = ['image', 'video', 'gif'];
const SPEAKER_GENDER_ENUM = ['male', 'female'];

const MediaSchema = new Schema({
    url: { type: String },
    duration: { type: String },
    mediaType: { type: String, enum: MEDIA_TYPES_ENUM, default: 'image' },
});

const SlideSpeakerSchema = new Schema({
    text: { type: String },
    audio: { type: String },
    speakerGender: { type: String, enum: SPEAKER_GENDER_ENUM },
})

const SlideSchema = new Schema({
    content: [SlideSpeakerSchema],
    audio: { type: String }, // the content audios combined together
    medias: [MediaSchema],
    video: { type: String }, // the medias combined with the audios
    position: { type: Number },
    duration: { type: Number },
    status: { type: String, enum: SLIDE_STATUS_ENUMS, default: 'done' },
    commentsThread: { type: Schema.Types.ObjectId, ref: SchemaNames.commentsThread },
});

const ArticleSchema = new Schema({
    title: { type: String },
    version: { type: Number, default: 1 },
    slides: [SlideSchema],
    video: { type: Schema.Types.ObjectId, ref: 'video' },
    commentsThread: { type: Schema.Types.ObjectId, ref: SchemaNames.commentsThread },
    /* 
        language field is the original language of the video
        when someone clones the article to translate it,
        this field should be set to be the target
        language
    */
    language: { type: String },
    organization: { type: Schema.Types.ObjectId, ref: SchemaNames.organization },
    articleType: { type: String, enum: ARTICLE_TYPE_ENUM, default: 'original' },
    // special fields for translation articleType
    translationProgress: { type: Number, default: 0 },
    originalArticle: { type: Schema.Types.ObjectId, ref: SchemaNames.article },
    // the user who cloned the article to translate it
    translator: { type: Schema.Types.ObjectId, ref: SchemaNames.user },
});

module.exports = { ArticleSchema, SlideSchema, MediaSchema };
