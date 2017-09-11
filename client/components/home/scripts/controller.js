function HomeController($window) {
  var that = this;
  that.foo = "Home!";
  console.log(that); // should print out the controller object

  var appWindow = angular.element($window);

  appWindow.bind("resize", function () {
    console.log("Resized your browser");
  });
}

angular.module("Home")
  .controller("HomeController", [
    "$window",
    HomeController
  ]);
