"use strict";

angular.module("TabContent", [
  "ngMaterial"
]);


angular.module("TabContent").config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    "self",
    // Allow loading from our assets domain. **.
    "https://www.youtube.com/**"
  ]);
});

angular.module("TabContent").filter(
  "trust", ["$sce", function($sce) {
    return function(htmlCode){
      return $sce.trustAsHtml(htmlCode);
    };
  }]);


require("./controller");
require("./directives/content");
require("./services/projectApi");
