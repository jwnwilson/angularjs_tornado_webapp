"use strict";

var work = angular.module("Work", [
  "ngMaterial"
]);

work.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    "self",
    // Allow loading from our assets domain. **.
    "https://www.youtube.com/embed/**"
  ]);
});


require("./controller");
require("./directives/project");
require("./services/getProjects");
