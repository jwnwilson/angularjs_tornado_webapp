"use strict";

function BlogController($http, $scope, $log){
  var blog = this;
  blog.title = "Blog";
  blog.posts = [];
  blog.tab = "blog";
  blog.post = {};
  blog.filteredPosts = [];
  $scope.total = 0;
  $scope.currentPage = 1;
  $scope.pageSize = 3;

  $scope.doCtrlPagingAct = function(text, page, pageSize, total) {
    $log.info({
      text: text,
      page: page,
      pageSize: pageSize,
      total: total
    });
    var pageStart = (page-1) * pageSize;
    var pageEnd = pageStart + pageSize;
    blog.filteredPosts = blog.posts.slice(pageStart, pageEnd);
    console.log(blog.filteredPosts);
  };

  $http.get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/110131/posts_1.json")
    .then(function(data){
      console.log("Getting data");
      blog.posts = data.data;
      blog.filteredPosts = blog.posts.slice(0, $scope.pageSize);
      $scope.total = data.data.length;
    });

  blog.selectTab = function(setTab){
    blog.tab = setTab;
    console.log(blog.tab);
  };

  blog.isSelected = function(checkTab){
    return blog.tab === checkTab;
  };

  blog.addPost = function(){
    blog.post.createdOn = Date.now();
    blog.post.comments = [];
    blog.post.likes = 0;
    blog.posts.unshift(this.post);
    blog.tab = 0;
    blog.post = {};
  };

}

angular.module("Blog")
  .controller("BlogController", [
    "$http",
    "$scope",
    "$log",
    BlogController,
  ]);
