const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { SchemaNames } = require('./utils/schemaNames');

const SLIDE_CONVERT_STATUS_ENUMS = ['processing', 'done', 'failed'];
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

const SpeakerProfileSchema = new Schema({
    speakerGender: { type: String, enum: SPEAKER_GENDER_ENUM },
    speakerNumber: { type: Number }, // To be Speaker 1, Speaker 2, Speaker 3...etc
})

const SlideSchema = new Schema({
    content: [SlideSpeakerSchema],
    audio: { type: String }, // the content audios combined together
    medias: [MediaSchema],
    video: { type: String }, // the medias combined with the audios
    position: { type: Number },
    duration: { type: Number },
    /*
        The slide content and media are combined together to form a video,
        this field should track the process
    */
    convertStatus: { type: String, enum: SLIDE_CONVERT_STATUS_ENUMS },
    commentsThread: { type: Schema.Types.ObjectId, ref: SchemaNames.commentsThread },
});

const ArticleSchema = new Schema({
    title: { type: String },
    version: { type: Number, default: 1 },
    slides: [SlideSchema],
    video: { type: Schema.Types.ObjectId, ref: 'video' },
    commentsThread: { type: Schema.Types.ObjectId, ref: SchemaNames.commentsThread },
    noOfSpeakers: { type: Number, default: 1 },
    speakersProfile: [SpeakerProfileSchema],
    /* 
        language field is the original language of the video
        when someone clones the article to translate it,
        this field should be set to be the target
        language
    */
    language: { type: String },
    organization: { type: Schema.Types.ObjectId, ref: SchemaNames.organization },
    // Either an original article or a translation article ( cloned by a translator to be translated )
    articleType: { type: String, enum: ARTICLE_TYPE_ENUM, default: 'original' },
    // special fields for translation articleType
    
    // text translation progress
    translationProgress: { type: Number, default: 0 },
    // voice over translation progress
    voiceOverProgress: { type: Number, default: 0 },
    // Set to the original article that the translation was cloned from
    originalArticle: { type: Schema.Types.ObjectId, ref: SchemaNames.article },
    // the user who cloned the article to translate it
    translator: { type: Schema.Types.ObjectId, ref: SchemaNames.user },
});

module.exports = { ArticleSchema, SlideSchema, MediaSchema, SpeakerProfileSchema };
