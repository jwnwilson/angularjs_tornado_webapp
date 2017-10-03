"use strict";

function WorkController($scope, $window) {
  $scope.context = $window.CONTEXT;
  $scope.projects = [
    {
      "title": "test",
      "text": "Hello project",
      "youtube_url": "https://www.youtube.com/embed/8eh4N69zte4"
    }
  ];
}

angular.module("Work")
  .controller("WorkController", [
    "$scope",
    "$window",
    "$sceDelegate",
    WorkController
  ])
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      "self",
      // Allow loading from our assets domain. **.
      "https://www.youtube.com/embed/**"
    ]);
  });
