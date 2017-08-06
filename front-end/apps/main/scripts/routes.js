function routesConfig($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: _urlPrefixes.TEMPLATES + "components/home/templates/home.html",
      label: "Home"
    })
    .otherwise({
      templateUrl: _urlPrefixes.TEMPLATES + "apps/main/templates/404.html"
    });
}

routesConfig.$inject = ["$routeProvider"];

module.exports = routesConfig;
