var express = require("express");
var router = express.Router();
var articleModel = require("../models/article.model");
var userModel = require("../models/user.model");
var commentModel = require("../models/comment.model");
var verifyTokenMiddleware = require("../auth/verifyTokenMiddleware");

var selectUserPopulated = {
  path: "author",
  select: "-_id -username -avatar -type -deleted -password -__v"
};

var selectArticlePopulated = {
  path: "articleId",
  select: "-_id -title"
};



router.post("/", verifyTokenMiddleware, function(request, response) {
  var newComment = new commentModel(request.body);
  newComment.content = request.body.comment.content;
  newComment.author = request.params.userid;
  var idArticle = request.body.articleid;
  console.log('idArticle ', idArticle);
  newComment.save(function(err, commentCreated) {
    if (err) {
      return response.status(500).send({
        message: "There was a problem registering the comment",
        error: err
      });
    } else {
      //inicio push
      articleModel.findOne({
        _id: idArticle,//request.params.articleid,
        deleted: false
      }, function (err, articleFound) {
        if (err)
          return response.status(500).send({
            message: 'There was a problem to find the article, error server',
            error: err
          });
        if (!articleFound)
          return response.status(404).send({
            message: 'There was a problem to find the article, invalid id',
            error: ''
          });
          console.log('antes de PUSH al array de article');
        articleFound.comments.push(commentCreated.id);
          console.log('antes de add al array de article');
        
        articleFound.save(function (error, articleUpdated) {
          if (error)
            return response.status(500).send({
              message: 'Thera was a problem to update the article, error serve',
              error: error
            });
        });
      });
      //fin push
      userModel.populate(commentCreated, selectUserPopulated, function(errPopulating,populatedComment) {
        if (errPopulating)
          return response.status(500).send({
            message: "There was a problem creating the comment",
            error: errPopulating
          });
        response.send({
          message: "A new comment has been created",
          data: populatedComment.getDtoComment()
        });
      });
    }
  });
});

router.get('/', function (request, response) {
  commentModel.find({
  }, {
    __v: 0
  }, null, function (err, commentList) {
    if (err) {
      return response.status(500).send({
        message: 'there was a problem retrieving the article list',
        error: err
      });
    } else {
      userModel.populate(commentList, selectUserPopulated, function (errPopulating, populatedCommentList) {
        if (errPopulating)
          return response.status(500).send({
            message: 'there was a problem retrieving the commentList ',
            error: errPopulating
          });
        response.send({
          message: 'The commentList has been retrieved',
          data: populatedCommentList
        });
      });
    }
  });
});

module.exports = router;
