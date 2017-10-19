"use strict";

function TabContentDirective() {
  return {
    restrict: "E",
    scope: {
      project: "="
    },
    templateUrl: "static/components/tabContent/templates/content.html"
  };
}

angular.module("TabContent")
  .directive("tabcontent", [
    TabContentDirective
  ]);
