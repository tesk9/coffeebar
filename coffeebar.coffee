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
      if predicate val, ind, collection
        return val
  else
    for key, val of collection
      if predicate val, key, collection
        return val
  undefined

_.filter = (collection, predicate) ->
  result = []
  _.each collection, (val, ind, list) ->
    if predicate val, ind, list
      result.push val
  result

_.where = (list, keyValuePairs) ->
  _.filter list, (obj) ->
    for wantedKey, wantedVal of keyValuePairs
      if obj[wantedKey] != wantedVal
        return false
    return true
    
_.findWhere = (list, keyValuePairs) ->
  _.find list, (obj) ->
    for wantedKey, wantedVal of keyValuePairs
      if obj[wantedKey] != wantedVal
        return false
    return true

module.exports = _