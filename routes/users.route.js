var express = require('express');
var router = express.Router();
var userModel = require('../models/user.model');

router.get('/', function (request, response) {
  userModel.find({}, {}, null, function (err, userList) {
    if (err) {
      return response.status(500).send({
        message: 'Thera was a problem retrieving the user list',
        error: err
      });
    } else {
      response.send({
        message: 'The userlist has been retrieved',
        data:userList
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
      response.send({
        message: 'A new user has been created',
        data: userCreated
      });
    }

  });
});

router.put('/', function (request, response) {
  response.send('accediendo a usuarios con el metodo put');
  console.log('log put: ', request.body);
});

router.delete('/', function (request, response) {
  response.send('accediendo a usuarios con el metodo delete');
});

router.get('/find', function (request, response) {
  response.send('buscando un users con el metodo get');
});

module.exports = router;