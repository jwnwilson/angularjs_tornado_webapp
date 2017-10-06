"use strict";

function WorkController($scope, $window, WorkService) {
  $scope.context = $window.CONTEXT;
  $scope.projects = [
    {
      "title": "test",
      "text": "Hello project",
      "youtube_url": "https://www.youtube.com/embed/8eh4N69zte4"
    }
  ];
  WorkService.getProjects();
}

angular.module("Work")
  .controller("WorkController", [
    "$scope",
    "$window",
    "WorkService",
    WorkController
  ]);
