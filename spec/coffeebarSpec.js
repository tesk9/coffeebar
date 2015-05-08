var jasmine = require('jasmine');
var _ = require('./../coffeebar.js');

describe("Underbar written in coffeescript", function() {
  var arr;
  var obj;

  describe("Collections", function() {

    beforeEach(function() {
      arr = [1,2,3,4,5];
      obj = {name: "Tessa", location: "San Francisco", hometown: "ABQ"};
    });

    describe("each", function() {

      it("applies callback to each element in array", function() {
        var result = [];
        _.each(arr, function(val) {
          result.push(val);
        });
        expect(result).toEqual(arr);
      });

      it("applies callback to each element in an object", function() {
        var result = [];
        _.each(obj, function(val) {
          result.push(val);
        });
        expect(result).toEqual(["Tessa", "San Francisco", "ABQ"]);
      });

    });

  });

});