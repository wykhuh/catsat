'use strict';

describe('Service: identify', function () {

  // load the service's module
  beforeEach(module('spaceappApp'));

  // instantiate service
  var identify;
  beforeEach(inject(function (_identify_) {
    identify = _identify_;
  }));

  it('should do something', function () {
    expect(!!identify).toBe(true);
  });

});
