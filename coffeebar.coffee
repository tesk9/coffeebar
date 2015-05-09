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

module.exports = _