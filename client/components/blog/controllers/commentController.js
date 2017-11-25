"use strict";

function CommentController($scope){
  this.comment = {};
  this.addComment = function(post){
    this.comment.createdOn = Date.now();
    post.comments.push(this.comment);
    this.comment = {};
    $scope.$emit("updateComment", {});
  };
}

angular.module("Blog")
  .controller("CommentController", [
    "$scope",
    CommentController
  ]);
