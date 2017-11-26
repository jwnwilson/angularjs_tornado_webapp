describe('App Tests', function() {
  var controller, rootScope, location, route, $log, httpBackend;

  beforeEach(function () {
      module('app');

      inject(function (_$log_, $controller, $rootScope, $location, $route, $httpBackend) {
        $log = _$log_;
        controller = $controller;
        rootScope = $rootScope;
        location = $location;
        route = $route;
        httpBackend = $httpBackend;
      });
    });

  describe('routing', function() {
    it('should route to home', function() {
      var url = 'static/components/home/templates/home.html';
      httpBackend.when('GET', url)
        .respond(200, {});

      location.path('/');
      rootScope.$digest();

      expect(route.current.templateUrl)
        .toBe(url);
    });

    it('should route to blog', function() {
      var url = 'static/components/blog/templates/blog.html';
      httpBackend.when('GET', url)
        .respond(200, {});

      location.path('/blog');
      rootScope.$digest();

      expect(route.current.templateUrl)
        .toBe(url);
    });

    it('should route to hobbies', function() {
      var url = 'static/components/hobbies/templates/hobbies.html';
      httpBackend.when('GET', url)
        .respond(200, {});

      location.path('/hobbies');
      rootScope.$digest();

      expect(route.current.templateUrl)
        .toBe(url);
    });

    it('should route to work', function() {
      var url = 'static/components/work/templates/work.html';
      httpBackend.when('GET', url)
        .respond(200, {});

      location.path('/work');
      rootScope.$digest();

      expect(route.current.templateUrl)
        .toBe(url);
    });
  });
});
