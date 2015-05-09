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

      it("callback has access to array and to index", function() {
        var result = [], copyArr = [];
        _.each(arr, function(val, ind, arr) {
          result.push(ind);
          copyArr.push(arr[ind]);
        });
        expect(result).toEqual([0,1,2,3,4]);
        expect(copyArr).toEqual(arr);
      });

      it("applies callback to each element in an object", function() {
        var result = [];
        _.each(obj, function(val) {
          result.push(val);
        });
        expect(result).toEqual(["Tessa", "San Francisco", "ABQ"]);
      });

      it("callback invoked with key & object arguments", function() {
        var result = [], copy;
        _.each(obj, function(val, key, object) {
          result.push(key);
          copy = object;
        });
        expect(result).toEqual(["name", "location", "hometown"]);
        expect(copy).toEqual(obj);
      });

    });

    describe("map", function() {

      it("returns a new array", function() {
        var result = _.map(arr, function(val) {
          return val;
        });
        expect(result).not.toBe(arr);
        expect(arr).toEqual([1,2,3,4,5]);
      });

      it("callback applied to each value in the array", function() {
        var result = _.map(arr, function(val) {
          return val * 2;
        });
        expect(result).toEqual([2,4,6,8,10]);
      });

      it("applies callback to each element in an object", function() {
        var result = _.map(obj, function(val) {
          return val + "!";
        });
        expect(result).toEqual(["Tessa!", "San Francisco!", "ABQ!"]);
      });

    });
  

    describe("reduce", function() {

      it("combines the values of a collection according to an accumulator with a startVal", function() {
        console.log(arr)
        var result = _.reduce(arr, function(a, b) {
          return a + b;
        }, 5);
        expect(result).toBe(20);
      });

      it("combines the values of a collection according to an accumulator without a startVal", function() {
        var result = _.reduce(obj, function(a, b) {
          return a + " " + b;
        });
        expect(result).toBe("Tessa San Francisco ABQ");
      });

    });

  });

});