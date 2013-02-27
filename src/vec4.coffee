shim = require 'shim'

EPSILON = 0.000001

module.exports =
  divide:   (a, b, out = b)    -> shim 'vec4', 'divide',   out, a, b
  multiply: (a, b, out = b)    -> shim 'vec4', 'multiply', out, a, b
  subtract: (a, b, out = b)    -> shim 'vec4', 'subtract', out, a, b
  add:      (a, b, out = b)    -> shim 'vec4', 'add',      out, a, b
  scale:    (a, s, out = a)    -> shim 'vec4', 'scale',    out, a, s
  negate:   (a, out = a)       -> shim 'vec4', 'negate',   out, a
  lerp:     (a, b, l, out = a) -> shim 'vec4', 'lerp',  out, a, b, l
  length:   (a)                -> shim 'vec4', 'length', a
  squaredLength: (a)           -> shim 'vec4', 'squaredLength', a

  set:      (a, out)           ->
    shim.log 'vec4', 'set'
    shim.q 'vec4', 'copy',     out, a

  createFrom: (args...)        ->
    shim.log 'vec4', 'createFrom'
    shim.q 'vec4', 'clone', args

  str: (v) ->
    shim.log 'vec4', 'str'
    shim.q('vec4', 'str', v).replace(/vec4\((.*)\)/, '[$1]')

  equal: (a, b) ->
    shim.log 'vec4', 'equal'
    return true if a is b
    for i in [0..3]
      return false unless Math.abs(a[i] - b[i]) < EPSILON
    true

  create:       (values)        ->
    shim.log 'vec4', 'create'
    if values
      shim.q 'vec4', 'clone', values
    else
      out = shim.q 'vec4', 'create'
      # 1.x set out to 0, 2.x sets to identity
      out[0] = out[1] = out[2] = out[3] = 0
      out
