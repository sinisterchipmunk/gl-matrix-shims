GLMatrix = require 'gl-matrix-wrapper'

count = 0

# shim('mat4', 'create', ...)
module.exports = (type, name, args...) ->
  module.exports.log type, name, args...
  module.exports.q type, name, args...

# shim.q('mat4', 'create', ...) - always quiet
module.exports.q = (type, name, args...) ->
  throw new Error "Undefined: GLMatrix.#{type}.#{name}" unless GLMatrix[type][name]
  GLMatrix[type][name] args...

# shim.log('mat4', 'create')
module.exports.log = (type, name) ->
  return unless GLMatrix.noisy
  console.log "Warning: SHIMMED call (##{++count}) to GLMatrix v1.x:", "#{type}.#{name}"
  if GLMatrix.stack
    console.log new Error().stack
