function AboutController() {
  var that = this;
  that.foo = "About!";
  console.log(that); // should print out the controller object
}

angular.module("About")
  .controller("AboutController", [
    AboutController
  ]);
