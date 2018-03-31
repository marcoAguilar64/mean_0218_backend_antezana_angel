var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 20,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

userSchema.methods.getDtoComment = function () {
  var commentDTO = {
    _id: this._id,
    content: this.content,
    author: this.author
  };
  return commentDTO;
};
module.exports = mongoose.model('Comment', userSchema);