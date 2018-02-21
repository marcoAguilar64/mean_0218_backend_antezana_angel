var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {
  response.send({ message: 'All articles', data: null });
});

router.post('/', function (request, response) {
  response.send({ message: 'All articles', data: null });
});

router.put('/:id', function (request, response) {
  response.send({ message: 'All articles', data: null });
});

router.delete('/:id', function (request, response) {
  response.send({ message: 'All articles', data: null });
});

router.get('/:id', function (request, response) {
  response.send({ message: 'All articles', data: null });
});

module.exports = router;