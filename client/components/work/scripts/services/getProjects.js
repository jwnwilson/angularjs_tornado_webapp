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
  this.$http.get(this._urlPrefixes["API"] + "projects").then(function(){
    console.log("Here");
  });
  console.log("Here");
};

angular.module("Work")
  .service("WorkService", [
    "$http",
    "_urlPrefixes",
    WorkService
  ]);
