"use strict";

function TabContentController($scope, $window, TabContentService) {
  $scope.context = $window.CONTEXT;
  $scope.vfx_projects = [];
  $scope.web_projects = [];
  $scope.personal_projects = [];
  $scope.artworks = [];
  $scope.gymnastics = [];

  TabContentService.getProjects().then(function(data) {
    if( data.data ){
      for ( var index in data.data ){
        if( data.data[index].category == "vfx"){
          $scope.vfx_projects.push(data.data[index]);
        }
        if( data.data[index].category == "web"){
          $scope.web_projects.push(data.data[index]);
        }
        if( data.data[index].category == "personal"){
          $scope.personal_projects.push(data.data[index]);
        }
      }
    }
  });

  TabContentService.getHobbies().then(function(data) {
    if( data.data ){
      for ( var index in data.data ){
        if( data.data[index].category == "artwork"){
          $scope.artworks.push(data.data[index]);
        }
        if( data.data[index].category == "gymnastics"){
          $scope.gymnastics.push(data.data[index]);
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
