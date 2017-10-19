"use strict";

var tabContent = angular.module("TabContent", [
  "ngMaterial"
]);

tabContent.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    "self",
    // Allow loading from our assets domain. **.
    "https://www.youtube.com/embed/**"
  ]);
});

require("./controller");
require("./directives/content");
require("./services/projectApi");
