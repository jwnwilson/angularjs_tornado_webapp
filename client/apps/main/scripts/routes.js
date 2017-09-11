function routesConfig($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: _urlPrefixes.TEMPLATES + "components/home/templates/home.html",
      label: "Home"
    })
    .when("/work", {
      templateUrl: _urlPrefixes.TEMPLATES + "components/work/templates/work.html",
      label: "Work"
    })
    .when("/hobbies", {
      templateUrl: _urlPrefixes.TEMPLATES + "components/hobbies/templates/hobbies.html",
      label: "Hobbies"
    })
    .otherwise({
      templateUrl: _urlPrefixes.TEMPLATES + "apps/main/templates/404.html"
    });
}

routesConfig.$inject = ["$routeProvider"];

module.exports = routesConfig;
