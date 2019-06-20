const mongoose = require('mongoose');
const { SchemaNames } = require('./Schemas/utils/schemaNames');

const ArticleSchemas = require('./Schemas/Article');
const CommentsThreadSchemas = require('./Schemas/CommentsThread');
const OrganizationSchemas = require('./Schemas/Organization');
const TranslationRequestSchemas = require('./Schemas/TranslationRequest');
const UserSchemas = require('./Schemas/User');
const VideoSchemas = require('./Schemas/Video');

const Article = mongoose.model(SchemaNames.article, ArticleSchemas.ArticleSchema);
const CommentsThread = mongoose.model(SchemaNames.commentsThread, CommentsThreadSchemas.CommentsThread);
const Organization = mongoose.model(SchemaNames.organization, OrganizationSchemas.OrganizationSchema);
const TranslationRequest = mongoose.model(SchemaNames.translationRequest, TranslationRequestSchemas.TranslationRequestSchema);
const User = mongoose.model(SchemaNames.user, UserSchemas.UserSchema);
const Video = mongoose.model(SchemaNames.video, VideoSchemas.VideoSchema);

module.exports = {
    TranslationRequest,
    CommentsThread,
    Organization,
    Article,
    Video,
    User,
}