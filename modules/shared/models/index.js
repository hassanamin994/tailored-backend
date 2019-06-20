const mongoose = require('mongoose');

const ArticleSchemas = require('./Schemas/Article');
const CommentsThreadSchemas = require('./Schemas/CommentsThread');
const OrganizationSchemas = require('./Schemas/Organization');
const TranslationRequestSchemas = require('./Schemas/TranslationRequest');
const UserSchemas = require('./Schemas/User');
const VideoSchemas = require('./Schemas/Video');

const Article = mongoose.model('article', ArticleSchemas.ArticleSchema);
const CommentsThread = mongoose.model('commentsThread', CommentsThreadSchemas.CommentsThread);
const Organization = mongoose.model('organization', OrganizationSchemas.OrganizationSchema);
const TranslationRequest = mongoose.model('translationRequest', TranslationRequestSchemas.TranslationRequestSchema);
const User = mongoose.model('user', UserSchemas.UserSchema);
const Video = mongoose.model('video', VideoSchemas.VideoSchema);

module.exports = {
    TranslationRequest,
    CommentsThread,
    Organization,
    Article,
    Video,
    User,
}