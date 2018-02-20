var mongoose = require('mongoose');
/*https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax*/

var validateemail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

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
    unique: true,
    minlength: 5,
    maxlength: 10,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateemail, 'Please enter a valid email']
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
    enum: ['USER', 'ADM'],
    default: 'USER'
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.speak = function () {
  console.log('Hi my name is : ' + this.name + '. How are you?');
};

userSchema.methods.getDtoUser = function () {
  var userDTO = {
    _id: this._id,
    name: this.name,
    lastname: this.lastname,
    username: this.username,
    email: this.email,
    avatar: this.avatar,
    type: this.type
    
  };
  return userDTO;
};

module.exports = mongoose.model('User', userSchema);