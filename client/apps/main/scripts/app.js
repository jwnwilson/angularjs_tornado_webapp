/* Libs */
require("angular/angular");
require("angular-route/angular-route");
require("angular-resource/angular-resource");
require("angular-material/angular-material");
require("angular-animate/angular-animate");
require("angular-aria/angular-aria");

/* Config Vars */
var routesConfig = require("./routes");
/* Components */
require("../../../components/header/scripts/controller");
require("../../../components/home/scripts/main");
require("../../../components/work/scripts/main");
require("../../../components/blog/scripts/main");
require("../../../components/tabContent/scripts/main");
require("../../../components/hobbies/scripts/main");

/* Globals */
_ = require("lodash");
_urlPrefixes = {
  API: "api/v1/",
  TEMPLATES: "static/"
};
var _mqWidth = {
  mobileLandscape: 480,
  tabletPortrait: 768,
  tabletLandscape: 1024,
  desktop: 1382
};
var CONTEXT;
/* Components */

/* App Dependencies */
var app = angular.module("app", [
  "ngMaterial",
  "ngResource",
  "ngRoute",
  "Header",
  "Home",
  "Work",
  "Hobbies",
  "TabContent",
  "Blog"
]);

app.value("_mqWidth", _mqWidth);
app.value("_urlPrefixes", _urlPrefixes);
app.value("context", CONTEXT || {}); // eslint-disable-line

/* App Config */
angular.module("app").config(routesConfig);
angular.module("app").config(function($mdThemingProvider){
  $mdThemingProvider.theme("default");
});
