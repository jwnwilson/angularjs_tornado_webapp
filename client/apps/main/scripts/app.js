/* Libs */
require("angular/angular");
require("angular-route/angular-route");
require("angular-resource/angular-resource");
/* Config Vars */
var routesConfig = require("./routes");
/* Components */
require("../../../components/home/scripts/main");
require("../../../components/work/scripts/main");

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
  "Home",
  "Work",
  "ngResource",
  "ngRoute",
]);
app.value("_mqWidth", _mqWidth);
app.value("_urlPrefixes", _urlPrefixes);

/* App Config */
angular.module("app").config(routesConfig);
