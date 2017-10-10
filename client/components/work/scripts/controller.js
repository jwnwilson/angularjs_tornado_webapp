"use strict";

function WorkController($scope, $window, WorkService) {
  $scope.context = $window.CONTEXT;
  $scope.projects = [];

  WorkService.getProjects().then(function(data) {
    if( data.data ){
      $scope.projects = data.data;
    }
  });
}

angular.module("Work")
  .controller("WorkController", [
    "$scope",
    "$window",
    "WorkService",
    WorkController,
  ]);
