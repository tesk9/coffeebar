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

    describe("find", function() {

      it("finds the first value that passes a truth test", function() {
        var result = _.find(arr, function(val, ind) { return ind > 2 });
        expect(result).toEqual(4);
      });

      it("returns undefined if no value passes the truth test", function() {
        var result = _.find(arr, function(val, ind) { return val > 10 });
        expect(result).toBe(undefined);
      });

    });

    describe("filter", function() {

      it("returns an array of values that pass the truth test when passed an array", function() {
        var result = _.filter(arr, function(val) {
          return val > 2;
        });
        expect(result).toEqual([3,4,5]);
      });

      it("returns an array of values that pass the truth test when passed an object", function() {
        var result = _.filter(obj, function(val, key) {
          return key === "hometown";
        });
        expect(result).toEqual(["ABQ"]);
      });

    });

    describe("where", function() {
      var catcher = {title: "Catcher in the Rye", author: "Steinbeck"};
      var bookArray = [ catcher,
                        {title: "To Kill a Mockingbird", author: "Harper Lee"},
                        {title: "Jane Eyre", author: "Bronte"},
                        {title: "Wuthering Heights", author: "Bronte"}
                       ];

      it("Returns an array with objects with the appropriate key-value pairs", function() {
        var result = _.where(bookArray, { author: "Bronte" });
        expect(result).toEqual([ {title: "Jane Eyre", author: "Bronte"}, {title: "Wuthering Heights", author: "Bronte"} ]);
      });

      it("Result array contains references to original objects", function() {
        var result = _.where(bookArray, {title: "Catcher in the Rye"});
        expect(result[0]).toBe(catcher);
      });

    });

    describe("findWhere", function() {
      var catcher = {title: "Catcher in the Rye", author: "Steinbeck"};
      var jane = {title: "Jane Eyre", author: "Bronte"};
      var bookArray = [ catcher,
                        {title: "To Kill a Mockingbird", author: "Harper Lee"},
                        jane,
                        {title: "Wuthering Heights", author: "Bronte"}
                       ];

      it("Returns an array with objects with the appropriate key-value pairs", function() {
        var result = _.findWhere(bookArray, { author: "Bronte" });
        expect(result).toBe(jane);
      });

      it("Returns undefined if truth test not met for any value", function() {
        var result = _.findWhere(bookArray, {title: "Boookzzz"});
        expect(result).toBe(undefined);
      });

    });

    describe("reject", function() {

      it("returns an array of values that do NOT pass the truth test when passed an array", function() {
        var result = _.reject(arr, function(val) {
          return val > 2;
        });
        expect(result).toEqual([1,2]);
      });

      it("returns an array of values that do NOT pass the truth test when passed an object", function() {
        var result = _.reject(obj, function(val, key) {
          return key === "hometown";
        });
        expect(result).toEqual(["Tessa", "San Francisco"]);
      });

    });

    describe("every", function() {

      it("returns true if a predicate returns true for every value in the passed-in collection", function() {
        var result = _.every(arr, function(val) {
          return typeof val === "number"; 
        });
        expect(result).toBe(true);
      });

      it("returns false if a predicate returns false for any value in the passed-in collection", function() {
        var result = _.every(arr, function(val) {
          return val > 1 && val < 3; 
        });
        expect(result).toBe(false);
      });

    });

    describe("some", function() {

      it("returns true if a predicate returns true for any value in the passed-in collection", function() {
        var result = _.some(arr, function(val) {
          return val === 3; 
        });
        expect(result).toBe(true);
      });

      it("returns false if a predicate returns false for all values in the passed-in collection", function() {
        var result = _.some(arr, function(val) {
          return val > 5; 
        });
        expect(result).toBe(false);
      });

    });

    describe("contains", function() {

      it("returns true if array contains passed-in value", function() {
        var res = _.contains(arr, 3);
        expect(res).toBe(true);
      });

      it("looks for value in array starting from passed-in fromIndex", function() {
        var res = _.contains(arr, 3, 3);
        expect(res).toBe(false);
      });

      it("returns true if an object does not contain passed-in value", function() {
        var res = _.contains(obj, "Tessa");
        expect(res).toBe(true);
      });

      it("returns false if an object does not contain passed-in value", function() {
        var res = _.contains(obj, 5);
        expect(res).toBe(false);
      });      

    });

  describe("invoke", function() {

    it("Calls the method named by methodName on each value in the list", function() {
      var shuffledArr = [2,3,1,4,5];
      var results = _.invoke([shuffledArr], 'sort');
      expect(results).toEqual([arr]);
    });

    it("Does not modify original array", function() {
      var shuffledArr = [[2,3,1,4,5]];
      var results = _.invoke(shuffledArr, 'sort');
      expect(results).not.toBe(shuffledArr);
    });

    it("Calls methodName with optional additional arguments", function() {
      var greetingArr = [["Hi there,"]];
      var results = _.invoke(greetingArr, 'concat', ["Tae,"], ["Sean,"], ["Chris, and"], ["Gunnari"]);
      expect(results[0].join(" ")).toEqual("Hi there, Tae, Sean, Chris, and Gunnari");
    });

  }); 

  describe("pluck", function() {

    it("Extracts a list of property values from an array of objects", function() {
      var obj2 = {name: "Alice", location: "Wonderland"};
      var obj3 = {name: "Taran", location: "Prydain"};
      var arr = [obj, obj2, obj3];
      var plucked = _.pluck(arr, "name");
      expect(plucked).toEqual(["Tessa", "Alice", "Taran"]);
    });

  });

  describe("max", function() {

    it("returns the maximum value in an array", function() {
      expect(_.max(arr)).toBe(5);
    });

    it("returns the maximum value in an object", function() {
      var obj = {val1: 1, val2: 2, val3: 3};
      expect(_.max(obj)).toBe(3);
    });

  })

  });

});