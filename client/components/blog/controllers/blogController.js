"use strict";

function BlogController($http, $scope, $log, context){
  var blog = this;

  // Variables
  blog.title = "Blog";
  blog.posts = [];
  blog.tab = "blog";
  blog.post = {};
  blog.filteredPosts = [];
  blog.url = "/api/v1/blogs";
  $scope.total = 0;
  $scope.currentPage = 1;
  $scope.pageSize = 3;
  $scope.context = context;

  // Functions
  blog.paging = paging;
  blog.getBlogPosts = getBlogPosts;
  blog.selectTab = selectTab;
  blog.isSelected = isSelected;
  blog.addPost = addPost;
  blog.updatePost = updatePost;
  blog.deletePost = deletePost;

  // Initialisation
  blog.getBlogPosts();

  function paging(text, page, pageSize, total) {
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
  }

  function getBlogPosts() {
    $http.get(blog.url)
      .then(function(data){
        console.log("Getting data");
        blog.posts = data.data;
        blog.filteredPosts = blog.posts.slice(0, $scope.pageSize);
        $scope.total = data.data.length;
      });
  }

  function selectTab(setTab) {
    blog.tab = setTab;
    blog.post = blog.posts[setTab];
    console.log(blog.tab);
  }

  function isSelected(checkTab) {
    return blog.tab === checkTab;
  }

  function addPost() {
    var config = {
      headers : {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
        "X-XSRFToken": context["xsrf"]
      }
    };
    $http.post(blog.url, JSON.stringify(blog.post), config)
      .then(function(data){
        console.log("Create blog post", data);
        blog.id = data.id;
        blog.tab = 0;
        blog.post = {};
      }.bind(this),
      function(error){
        console.log("Error: ", error);
      });
  }

  function updatePost() {
    if(!blog.post.id){
      console.log("Existing Id not found skipping update.");
      return;
    }

    var config = {
      headers : {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
        "X-XSRFToken": context["xsrf"]
      }
    };
    $http.post(blog.url, JSON.stringify(blog.post), config)
      .then(function(data){
        console.log("Updated blog post", data);
      }.bind(this),
      function(error){
        console.log("Error: ", error);
      });
  }

  function deletePost() {
    if(!blog.post.id){
      console.log("Existing Id not found skipping delete.");
      return;
    }

    var config = {
      headers : {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8;",
        "X-XSRFToken": context["xsrf"]
      }
    };
    $http.delete(blog.url + "?id=" + blog.post.id, config)
      .then(function(data){
        console.log("Deleted blog post", data);
        var index = blog.posts.indexOf(blog.post);
        blog.posts.splice(index, 1);
        blog.post = {};
      }.bind(this),
      function(error){
        console.log("Error: ", error);
      });
  }
}

angular.module("Blog")
  .controller("BlogController", [
    "$http",
    "$scope",
    "$log",
    "context",
    BlogController,
  ]);
