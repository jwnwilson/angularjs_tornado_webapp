/* jshint ignore:start */
"use strict";

/**
 * @ngInject
 *
 * @type {Function}
 */
var Service = function($http) {
  this.$http = $http;
};


Service.prototype.getProjects = function() {
};

/**
 * Export function to be used as Angular service.
 * @type {Function|angular.Service}
*/
module.exports = Service;
