"use strict";

function HeaderController($scope, $location)
{
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
}

angular.module("Header", [])
  .controller("HeaderController", [
    "$scope",
    "$location",
    HeaderController
  ]);
