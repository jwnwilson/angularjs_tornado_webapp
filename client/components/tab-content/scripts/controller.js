"use strict";

function TabContentController($scope, $window, TabContentService) {
  $scope.context = $window.CONTEXT;
  $scope.vfx_projects = [];
  $scope.web_projects = [];

  TabContentService.getProjects().then(function(data) {
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

angular.module("TabContent")
  .controller("TabContentController", [
    "$scope",
    "$window",
    "TabContentService",
    TabContentController,
  ]);
