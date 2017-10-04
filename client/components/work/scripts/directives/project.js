"use strict";

function WorkDirective() {
  return {
    restrict: "E",
    scope: {
      project: "="
    },
    templateUrl: "static/components/work/templates/workInfo.html"
  };
}

angular.module("Work")
  .directive("workdirective", [
    WorkDirective
  ]);
