var express = require('express');
var router = express.Router();
var articleModel = require('../models/article.model');
var userModel = require('../models/user.model');
var select = { deleted: 0, __v: 0 };
var query = { deleted: false };


router.get('/', function (request, response) {
  delete query._id;
  articleModel.find(query, select, null, function (err, articleList) {
    handleInternalError(err, response, function () {
      userModel.populate(articleList, { path: 'author' }, function (errPopulating, populatedArticleList) {
        handleInternalError(errPopulating, response, function () {
          var arrayPopulated = [];
          populatedArticleList.forEach(populateArticle => {
            arrayPopulated.push(populateArticle.getDtoArticle());
          });
          response.send({
            message: 'All articles',
            data: arrayPopulated
          });
        })
      });
      //response.send({ message: 'All articles', data: articleList });
    });

  });
});

router.post('/', function (request, response) {
  var newArticle = new articleModel(request.body);
  newArticle.save(function (err, articleCreated) {
    handleInternalError(err, response, function () {
      response.send({ message: 'Article created', data: articleCreated });
    });

  });
});

router.put('/:id', function (request, response) {
  query._id = request.params.id;
  articleModel.findOne(query, function (err, articleFound) {
    handleInternalError(err, response, function () {
      handleRosourceNotFound(articleFound, response, function () {
        for (var propiedad in request.body)
          articleFound[propiedad] = request.body[propiedad];
        articleFound.save(function (errr, articleSaved) {
          handleInternalError(errr, response, function () {
            response.send({ message: 'Article updated', data: articleSaved });
          });
        });
      });
    });
  });
});

router.delete('/:id', function (request, response) {
  query._id = request.params.id;
  articleModel.findOne(query, false, function (err, articleFound) {
    handleInternalError(err, response, function () {
      handleRosourceNotFound(articleFound, response, function () {
        articleFound.deleted = true;
        articleFound.save(function (error, articleSaved) {
          handleInternalError(error, response, function () {
            response.send({ message: 'Article deleted', data: articleSaved });
          });
        });
      });
    });
  });
});

router.get('/:id', function (request, response) {
  query._id = request.params.id;
  articleModel.findOne(query, {}, null, function (err, articleFound) {
    handleInternalError(err, response, function () {
      handleRosourceNotFound(articleFound, response, function () {
        userModel.populate(articleFound, { path: 'author' }, function (errPopulating, populatedArticle) {
          handleInternalError(errPopulating, response, function () {
            response.send({
              message: 'Article retrieved',
              data: populatedArticle.getDtoArticle()
            });
          })
        });
      });
    });
  });
});

var handleInternalError = function (error, response, successFunction) {
  if (error)
    return response.status(500).send({
      message: 'Internal Error Server',
      error: error
    });
  successFunction();
}

var handleRosourceNotFound = function (resource, response, successFunction) {
  if (!resource)
    return response.status(404).send({
      message: 'Resource not found, Invalid Id',
      error: null
    });
  successFunction();
};
module.exports = router;