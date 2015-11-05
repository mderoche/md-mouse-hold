describe('', function() {
  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {
    module = angular.module('mdMouseHold');
    dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('mdMouseHold.config')).to.be.ok;
  });
});