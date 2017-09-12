function HomeController($scope, $window, _mqWidth) {
  var self = this;
  self.cv_text = "CV";
  self.github_text = "Github";
  self.linkedin_text = "Linked In";
  $scope.cv_text = self.cv_text;
  $scope.github_text = self.github_text;
  $scope.linkedin_text = self.linkedin_text;

  var appWindow = angular.element($window);
  appWindow.bind("resize", function () {
    if( $window.innerWidth < _mqWidth.mobileLandscape ){
      $scope.$apply(function() {
        $scope.github_text = "";
        $scope.linkedin_text = "";
      });
    }
    else{
      $scope.$apply(function() {
        $scope.github_text = self.github_text;
        $scope.linkedin_text = self.linkedin_text;
      });
    }
    console.log("Resized your browser");
  });
}

angular.module("Home")
  .controller("HomeController", [
    "$scope",
    "$window",
    "_mqWidth",
    HomeController
  ]);
