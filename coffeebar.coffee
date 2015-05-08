_ = {};

_.each = (collection, callback) ->
  if Array.isArray collection
    callback num for num in collection
  else
    for key, val of collection
      callback val

module.exports = _