function WorkController($scope, $window) {
  $scope.context = $window.CONTEXT;
  $scope.projects = [
    {
      "title": "test",
      "text": "Hello project",
      "url": "www.test.com"
    }
  ];
}

angular.module("Work")
  .controller("WorkController", [
    "$scope",
    "$window",
    WorkController
  ]);
