'use strict';

describe('Controller: IdentifyCtrl', function () {

  // load the controller's module
  beforeEach(module('spaceappApp'));

  var IdentifyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IdentifyCtrl = $controller('IdentifyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
