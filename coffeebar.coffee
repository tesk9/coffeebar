_ = {};

_.each = (collection, callback) ->
  if Array.isArray collection
    callback num, ind, collection for num, ind in collection
  else
    for key, val of collection
      callback val, key, collection

_.map = (collection, callback) ->
  result = []
  _.each collection, (val, ind, list) ->
    result.push callback val, ind, list
  result

_.reduce = (collection, accumulator, startVal) ->
  _.each collection, (val) ->
    if startVal
      startVal = accumulator startVal, val
    else 
      startVal = val
  startVal

_.find = (collection, predicate) ->
  if Array.isArray collection
    for val, ind in collection
      if predicate val, ind, collection then return val
  else
    for key, val of collection
      if predicate val, key, collection then return val
  undefined

_.filter = (collection, predicate) ->
  result = []
  _.each collection, (val, ind, list) ->
    if predicate val, ind, list then result.push val
  result

_.where = (list, keyValuePairs) ->
  _.filter list, (obj) ->
    for wantedKey, wantedVal of keyValuePairs
      if obj[wantedKey] isnt wantedVal then return false
    true
    
_.findWhere = (list, keyValuePairs) ->
  _.find list, (obj) ->
    for wantedKey, wantedVal of keyValuePairs
      if obj[wantedKey] isnt wantedVal then return false
    true

_.reject = (list, predicate) ->
  _.filter list, (val, ind, list) ->
    not predicate val, ind, list

_.every = (list, predicate) ->
  isTrue = true;
  _.each list, (val, ind, list) ->
    if not predicate val, ind, list then isTrue = false
  isTrue

_.some = (list, predicate) ->
  isTrue = false;
  _.each list, (val, ind, list) ->
    if predicate val, ind, list then isTrue = true
  isTrue

_.contains = (list, value, fromIndex) ->
  if Array.isArray list
    if list.indexOf(value, fromIndex) isnt -1 then true else false
  else
    _.some list, (val, ind, list) ->
      val is value

_.invoke = (list, methodName, args...) ->
  _.map list, (value, key, collection) ->
    if typeof methodName is "function" then method = methodName
    else method = value[methodName]
    method.apply value, args

_.pluck = (list, propertyName) ->
  _.map list, (val) ->
    val[propertyName]

_.max = (list, iteratee) ->
  if iteratee then list = _.map list, iteratee
  else list = _.map list, (val) ->
    val
  Math.max.apply(null, list)


module.exports = _