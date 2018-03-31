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
  newComment.save(function(err, commentCreated) {
    if (err) {
      return response.status(500).send({
        message: "There was a problem registering the comment",
        error: err
      });
    } else {
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
