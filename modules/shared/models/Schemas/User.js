const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const USER_PERMISSIONS_ENUM = ['edit', 'update', 'translate'];
const REGISTER_METHOD_ENUM = ['email', 'social', 'invite'];
const INVITE_STATUS_ENUM = ['pending', 'accepted', 'declined'];

const UserSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    languages: [{ type: String }],
    email: { type: String, unique: true },
    password: { type: String },
    emailVerified: { type: Boolean, default: false },
    verifyToken: { type: String }, 
    registerMethod: { type: String, enum: REGISTER_METHOD_ENUM, default: 'email'},
    inviteStatus: { type: String, enum: INVITE_STATUS_ENUM, default: 'accepted' },
    // User's Organization info
    organizationOwner: { type: Boolean, default: false },
    organizations: { type: Schema.Types.ObjectId, ref: 'organization' },
    permissions: [{ type: String, enum: USER_PERMISSIONS_ENUM }],
});

module.exports = { UserSchema };