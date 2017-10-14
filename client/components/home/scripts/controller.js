function HomeController($scope, $window, _mqWidth) {
  var self = this;
  self.hide_text_limit = _mqWidth.tabletPortrait;
  $scope.context = $window.CONTEXT;

  self.cv_text = $scope.context.cv_text || "CV";
  self.github_text = $scope.context.github_text || "Github";
  self.linkedin_text = $scope.context.linkedin_text || "Linked In";
  self.instagram_text =  $scope.context.instagram_text || "Instagram";

  if( $window.innerWidth < self.hide_text_limit ){
    set_links(true);
  }
  else{
    set_links(false);
  }

  var appWindow = angular.element($window);
  appWindow.bind("resize", hide_text);

  function set_links(clear) {
    if( clear ){
      $scope.cv_text = "";
      $scope.github_text = "";
      $scope.linkedin_text = "";
      $scope.instagram_text = "";
    }
    else{
      $scope.cv_text = self.cv_text;
      $scope.github_text = self.github_text;
      $scope.linkedin_text = self.linkedin_text;
      $scope.instagram_text = self.instagram_text;
    }
  }

  function hide_text () {
    if( $window.innerWidth < self.hide_text_limit ){
      $scope.$apply(function() {
        set_links(true);
      });
    }
    else{
      $scope.$apply(function() {
        set_links(false);
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
