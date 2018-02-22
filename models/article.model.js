var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 70,
    trim: true
  },
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
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

articleSchema.methods.getDtoArticle = function () {
  var articleDTO = {
    _id: this._id,
    title: this.title,
    content: this.content,
    owner: this.owner
  };
  return articleDTO;
};

module.exports = mongoose.model('Article', articleSchema);