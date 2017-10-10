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
require("../../../components/home/scripts/main");
require("../../../components/work/scripts/main");
require("../../../components/header/scripts/controller");

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
/* Components */

/* App Dependencies */
var app = angular.module("app", [
  "Header",
  "Home",
  "Work",
  "ngResource",
  "ngRoute",
]);
app.value("_mqWidth", _mqWidth);
app.value("_urlPrefixes", _urlPrefixes);

/* App Config */
angular.module("app").config(routesConfig);
angular.module("app").config(function($mdThemingProvider){
  $mdThemingProvider.theme("default");
});
