var mongoose = require('mongoose');

var du3aaSchema = new mongoose.Schema({
    du3aa: {
        type: String,
        required: true
    }
});

// var Du3aaModel = module.exports = mongoose.model('du3aa', du3aaSchema);
module.exports = mongoose.model('du3aa', du3aaSchema);

module.exports.get = function (callback, limit) {
    Du3aaModel.find(callback).limit(limit);
}