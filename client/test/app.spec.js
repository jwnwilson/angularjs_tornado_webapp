describe('App Tests', function() {
  var controller, rootScope, location, route, $log;

  beforeEach(function () {
      module('app');

      inject(function (_$log_, $controller, $rootScope, $location, $route) {
        $log = _$log_;
        controller = $controller;
        rootScope = $rootScope;
        location = $location;
        route = $route;
      });
    });

  describe('routing', function() {
    it('should route to home', function() {
      location.path('/');
      rootScope.$digest();

      expect(route.current.templateUrl)
        .toBe('static/components/home/templates/home.html');
    });

    it('should route to blog', function() {
      location.path('/blog');
      rootScope.$digest();

      expect(route.current.templateUrl)
        .toBe('static/components/blog/templates/blog.html');
    });

    it('should route to hobbies', function() {
      location.path('/hobbies');
      rootScope.$digest();

      expect(route.current.templateUrl)
        .toBe('static/components/hobbies/templates/hobbies.html');
    });

    it('should route to work', function() {
      location.path('/work');
      rootScope.$digest();

      expect(route.current.templateUrl)
        .toBe('static/components/work/templates/work.html');
    });
  });
});
