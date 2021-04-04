const mongoose = require("mongoose")

const guildSchemas = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    prefix: {
        type:  mongoose.SchemaTypes.String,
        required:true,
        default: "!",

    },
    defaultRole: {
        type:  mongoose.SchemaTypes.String,
        required: false,
        default: null,
    },
// guild channels
    memberLogChannel: {
        type:  mongoose.SchemaTypes.String,
        required: false,
        default: null,
    },
    logChannel: {
        type:  mongoose.SchemaTypes.String,
        required: false,
        default: null,
    },
    bumpChannelServers: {
        type:  mongoose.SchemaTypes.String,
        required: false,
        default: null,
    },
    bumpChannelBots: {
        type:  mongoose.SchemaTypes.String,
        required: false,
        default: null,
    },
    // guild Bump Channels server settings
    bumpServerDescription: {
        type:  mongoose.SchemaTypes.String,
        required: false,
        default: null,
    },
    bumpServerInviteurl: {
        type:  mongoose.SchemaTypes.String,
        required: false,
        default: null,
    },
})
module.exports = mongoose.model("guild", guildSchemas)


/**hints
 * mongoose.SchemaTypes. mongoose.SchemaTypes.String {{{ => equal <=}}  mongoose.SchemaTypes.String
 *
 */