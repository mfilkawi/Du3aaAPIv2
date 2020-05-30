var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)

module.exports.get = function (callback, limit) {
    UserModel.find(callback).limit(limit);
}