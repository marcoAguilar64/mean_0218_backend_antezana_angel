var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');

router.get('/', function (request, response) {
  userModel.find({
    deleted: false
  }, {
      password: 0,
      deleted: 0,
      __v: 0
    }, null, function (err, userList) {
      if (err) {
        return response.status(500).send({
          message: 'Thera was a problem retrieving the user list',
          error: err
        });
      } else {
        response.send({
          message: 'The userlist has been retrieved',
          data: userList
        });
      }
    });
});

router.post('/', function (request, response) {
  var newUser = new userModel(request.body);
  newUser.save(function (err, userCreated) {
    if (err) {
      return response.status(500)
        .send({
          message: 'There was a problem registering ther user',
          error: err
        });
    } else {
      userCreated.speak();
      response.send({
        message: 'A new user has been created',
        data: userCreated.getDtoUser()
      });
    }

  });
});

router.put('/:id', function (request, response) {
  userModel.findByIdAndUpdate(request.params.id, request.body, {
    new: true
  }, function (err, userUpdated) {
    if (err) {
      return response.status(500).send({
        message: 'Thera was a problem updating a user',
        error: err
      });
    } else {
      response.send({
        message: 'A user has been updated',
        data: userUpdated.getDtoUser()
      });
    }
  });
});

router.delete('/:id', function (request, response) {
  userModel.findOne({
    _id: request.params.id,
    deleted: false
  }, function (err, userFound) {
    if (err)
      return response.status(500).send({
        message: 'There was a problem to delete the user, error server',
        error: err
      });
    if (!userFound)
      return response.status(404).send({
        message: 'There was a problem to get the user(invalid id)',
        error: ''
      });

    userFound.deleted = true;

    userFound.save(function (error, userUpdated) {
      if (error)
        return response.status(500).send({
          message: 'There was a problem to delete the user, error server',
          error: error
        });
      response.send({
        message: 'The user has been deleted',
        data: userUpdated.getDtoUser()
      });
    });
  });
});

router.get('/:id', function (request, response) {
  userModel.findById(request.params.id, {}, null, function (err, userFound) {
    if (err) {
      return response.status(500).send({
        message: 'Thera was a problem retrieving the user by id',
        error: err
      });
    } else {
      response.send({
        message: 'User found by id',
        data: userFound.getDtoUser()
      });
    }
  });
});

module.exports = router;