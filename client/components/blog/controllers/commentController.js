"use strict";

function CommentController(){
  this.comment = {};
  this.addComment = function(post){
    this.comment.createdOn = Date.now();
    post.comments.push(this.comment);
    this.comment = {};
  };
}

angular.module("Blog")
  .controller("CommentController", [
    CommentController,
  ]);
