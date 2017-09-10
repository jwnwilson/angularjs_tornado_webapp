function WorkController() {
  var that = this;
  that.foo = "Work!";
  console.log(that); // should print out the controller object
}

angular.module("Work")
  .controller("WorkController", [
    WorkController
  ]);
