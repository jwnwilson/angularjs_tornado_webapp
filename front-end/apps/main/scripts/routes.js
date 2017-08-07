function routesConfig($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: _urlPrefixes.TEMPLATES + "components/home/templates/home.html",
      label: "Home"
    })
    .when("/about", {
      templateUrl: _urlPrefixes.TEMPLATES + "components/about/templates/about.html",
      label: "About"
    })
    .otherwise({
      templateUrl: _urlPrefixes.TEMPLATES + "apps/main/templates/404.html"
    });
}

routesConfig.$inject = ["$routeProvider"];

module.exports = routesConfig;
