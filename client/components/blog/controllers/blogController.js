"use strict";

function BlogController($http, $scope, $log){
  var blog = this;
  blog.title = "Blog";
  $scope.total = 10;
  $scope.currentPage = 1;
  $scope.pageSize = 5;

  $scope.doCtrlPagingAct = function(text, page, pageSize, total) {
    $log.info({
      text: text,
      page: page,
      pageSize: pageSize,
      total: total
    });
  };

  blog.posts = [];
  $http.get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/110131/posts_1.json")
    .then(function(data){
      blog.posts = data.data;
    });

  blog.tab = "blog";

  blog.selectTab = function(setTab){
    blog.tab = setTab;
    console.log(blog.tab);
  };

  blog.isSelected = function(checkTab){
    return blog.tab === checkTab;
  };

  blog.post = {};
  blog.addPost = function(){
    blog.post.createdOn = Date.now();
    blog.post.comments = [];
    blog.post.likes = 0;
    blog.posts.unshift(this.post);
    blog.tab = 0;
    blog.post ={};
  };

}

angular.module("Blog")
  .controller("BlogController", [
    "$http",
    "$scope",
    "$log",
    BlogController,
  ]);
