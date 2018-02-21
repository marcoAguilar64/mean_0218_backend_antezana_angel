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
    type: Schema.Types.ObjectId,
    ref: 'User'
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