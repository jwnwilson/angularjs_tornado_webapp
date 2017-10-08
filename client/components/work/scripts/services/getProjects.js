/* jshint ignore:start */
"use strict";

/**
 * @ngInject
 *
 * @type {Function}
 */
var WorkService = function($http, _urlPrefixes) {
  this.$http = $http;
  this._urlPrefixes = _urlPrefixes;
};

WorkService.prototype.getProjects = function() {
  return this.$http.get(this._urlPrefixes["API"] + "projects").then(function(projectData){
    return projectData;
  }, function(error){
    console.log("Error retrieving projects: " + error);
  });
};

angular.module("Work")
  .service("WorkService", [
    "$http",
    "_urlPrefixes",
    WorkService
  ]);
