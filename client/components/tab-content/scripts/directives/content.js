"use strict";

function TabContentDirective() {
  return {
    restrict: "E",
    scope: {
      project: "="
    },
    templateUrl: "static/components/tab-content/templates/content.html"
  };
}

angular.module("TabContent")
  .directive("tabContentdirective", [
    TabContentDirective
  ]);
