/* jshint ignore:start */
"use strict";

/**
 * @ngInject
 *
 * @type {Function}
 */
var TabContentService = function($http, _urlPrefixes) {
  this.$http = $http;
  this._urlPrefixes = _urlPrefixes;
};

TabContentService.prototype.getProjects = function() {
  return this.$http.get(this._urlPrefixes["API"] + "projects").then(function(projectData){
    return projectData;
  }, function(error){
    console.log("Error retrieving projects: " + error);
  });
};

TabContentService.prototype.getHobbies = function() {
  return this.$http.get(this._urlPrefixes["API"] + "hobbies").then(function(projectData){
    return projectData;
  }, function(error){
    console.log("Error retrieving projects: " + error);
  });
};

angular.module("TabContent")
  .service("TabContentService", [
    "$http",
    "_urlPrefixes",
    TabContentService
  ]);
