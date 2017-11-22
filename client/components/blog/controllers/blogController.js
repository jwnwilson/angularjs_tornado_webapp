"use strict";

function BlogController($http, $scope, $log, $route, context){
  var blog = this;

  // Variables
  blog.title = "Blog";
  blog.posts = [];
  blog.tab = "blog";
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
  blog.newPost = newPost;

  // Initialisation
  blog.newPost();
  blog.getBlogPosts();

  /**
   * Slice list of blogs to paginate the blogs
   */
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

  /**
   * Make get request to API to get all blog posts
   */
  function getBlogPosts() {
    $http.get(blog.url)
      .then(function(data){
        console.log("Getting data");
        blog.posts = data.data;
        blog.filteredPosts = blog.posts.slice(0, $scope.pageSize);
        $scope.total = data.data.length;
      });
  }

  /**
   * Change tab in blog by setting tab variable
   */
  function selectTab(setTab) {
    blog.tab = setTab;
    if(setTab == "new") {
      blog.newPost();
    }
    else {
      blog.post = blog.posts[setTab];
    }
    console.log(blog.tab);
  }

  function isSelected(checkTab) {
    return blog.tab === checkTab;
  }

  /**
   * Send the current post data to the API to create a new post in the DB
   * Force refresh of page after POST request ot API
   */
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
        blog.newPost();
        $route.reload();
      }.bind(this),
      function(error){
        console.log("Error: ", error);
      });
  }

  /**
   * If current post has an id make API call to update post
   */
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
        $route.reload();
      }.bind(this),
      function(error){
        console.log("Error: ", error);
      });
  }

  /**
   * If current post has an id make API call to delete post then remove
   * it from list of posts.
   */
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
        blog.newPost();
        $route.reload();
      }.bind(this),
      function(error){
        console.log("Error: ", error);
      });
  }

  /**
   * Clear the current post data and create a new empty message
   */
  function newPost() {
    var newPost = {};
    newPost.title = "";
    newPost.text = "";
    newPost.created = new Date();
    newPost.updated = new Date();
    newPost.image = "";
    newPost.author = "";
    blog.post = newPost;
  }
}



angular.module("Blog")
  .controller("BlogController", [
    "$http",
    "$scope",
    "$log",
    "$route",
    "context",
    BlogController,
  ]);
