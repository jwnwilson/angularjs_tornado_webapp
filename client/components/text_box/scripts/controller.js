function TextBoxController() {
  var that = this;
  that.foo = "Home!";
  console.log(that); // should print out the controller object
}

angular.module("TextBox")
  .controller("TextBoxController", [
    TextBoxController
  ]);
