function HomeController($scope, $window) {
  $scope.cv_text = "CV";
  $scope.github_text = "Github";
  $scope.linkedin_text = "Linked In";


  var appWindow = angular.element($window);
  appWindow.bind("resize", function () {
    console.log("Resized your browser");
  });
}

angular.module("Home")
  .controller("HomeController", [
    "$scope",
    "$window",
    HomeController
  ]);
