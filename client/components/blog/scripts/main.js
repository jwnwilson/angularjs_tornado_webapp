require("angular-paging/dist/paging");

angular.module("Blog", [
  "bw.paging"
]);

require("../controllers/blogController");
require("../controllers/commentController");
