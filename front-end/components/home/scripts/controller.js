function HomeController() {
  var that = this;
  that.foo = "Home!";
  console.log(that); // should print out the controller object
}

angular.module("Home")
  .controller("HomeController", [
    HomeController
  ]);
