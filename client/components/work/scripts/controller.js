"use strict";

function WorkController($scope, $window, WorkService) {
  $scope.context = $window.CONTEXT;
  $scope.vfx_projects = [];
  $scope.web_projects = [];

  WorkService.getProjects().then(function(data) {
    if( data.data ){
      for ( var index in data.data ){
        if( data.data[index].category == "vfx"){
          $scope.vfx_projects.push(data.data[index]);
        }
        if( data.data[index].category == "web"){
          $scope.web_projects.push(data.data[index]);
        }
      }
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
