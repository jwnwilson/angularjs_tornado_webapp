function HomeController($scope, $window, _mqWidth) {
  var self = this;
  self.cv_text = "CV";
  self.github_text = "Github";
  self.linkedin_text = "Linked In";
  self.hide_text_limit = _mqWidth.tabletPortrait;
  $scope.cv_text = self.cv_text;
  $scope.github_text = self.github_text;
  $scope.linkedin_text = self.linkedin_text;
  $scope.context = $window.CONTEXT;

  if( $window.innerWidth < self.hide_text_limit ){
    $scope.github_text = "";
    $scope.linkedin_text = "";
  }

  var appWindow = angular.element($window);
  appWindow.bind("resize", hide_text);

  function hide_text () {
    if( $window.innerWidth < self.hide_text_limit ){
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
  }
}

angular.module("Home")
  .controller("HomeController", [
    "$scope",
    "$window",
    "_mqWidth",
    HomeController
  ]);
