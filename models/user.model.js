var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique:true,
    minlength: 5,
    maxlength:10,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'http://fotouser.miarroba.st/68731257/300/mr-anonimo.jpg'
  },
  type: {
    type: String,
    enum:['USER','ADM'],
    default: 'USER'
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);