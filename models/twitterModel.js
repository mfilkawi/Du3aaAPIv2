var mongoose = require('mongoose');

var twitterSchema = new mongoose.Schema({
    oauth_token: {
        type: String,
        required: true
    },
    oauth_token_secret: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    screen_name: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('twitter', twitterSchema);