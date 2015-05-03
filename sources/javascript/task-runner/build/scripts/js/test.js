(function() {
  var testCoffee,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  testCoffee = (function() {
    function testCoffee() {
      this.method2 = bind(this.method2, this);
    }

    testCoffee.prototype.method = function(abc) {
      return console.log(abc);
    };

    testCoffee.prototype.method2 = function(def) {
      return console.log(def);
    };

    return testCoffee;

  })();

}).call(this);
