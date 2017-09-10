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

/* Components */

/* App Dependencies */
angular.module("app", [
  "Home",
  "Work",
  "ngResource",
  "ngRoute",
]);

/* App Config */
angular.module("app").config(routesConfig);
