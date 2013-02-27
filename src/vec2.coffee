shim = require 'shim'

tmp = [0,0,0]
EPSILON = 0.000001

module.exports =
  divide:       (a, b, out = b) -> shim 'vec2', 'divide',    out, a, b
  multiply:     (a, b, out = b) -> shim 'vec2', 'multiply',  out, a, b
  subtract:     (a, b, out = b) -> shim 'vec2', 'subtract',  out, a, b
  add:          (a, b, out = b) -> shim 'vec2', 'add',       out, a, b
  scale:        (a, b, out = a) -> shim 'vec2', 'scale',     out, a, b
  dist:         (a, b)          -> shim 'vec2', 'dist',      a, b
  negate:       (a, out = a)    -> shim 'vec2', 'negate',    out, a
  normalize:    (a, out = a)    -> shim 'vec2', 'normalize', out, a
  length:       (a)             -> shim 'vec2', 'length',    a
  dot:          (a, b)          -> shim 'vec2', 'dot',       a, b
  lerp:         (a, b, amt, out = a) -> shim 'vec2', 'lerp', out, a, b, amt
  squaredLength:(a)             -> shim 'vec2', 'squaredLength', a

  set:          (a, out)        ->
    shim.log 'vec2', 'set'
    shim.q 'vec2', 'copy',      out, a

  str: (v) ->
    shim.log 'vec2', 'str'
    shim.q('vec2', 'str', v).replace(/vec2\((.*)\)/, '[$1]')

  direction:    (a, b, out = a) ->
    shim.log 'vec2', 'direction'
    shim.q 'vec2', 'normalize', out, shim.q 'vec2', 'subtract', out, a, b

  cross:        (a, b, out) ->
    shim.log 'vec2', 'cross'
    if out then shim.q 'vec2', 'cross',     out, a, b
    else
      shim.q 'vec2', 'cross', tmp, a, b
      tmp[2]

  createFrom: (args...) ->
    shim.log 'vec2', 'createFrom'
    shim.q 'vec2', 'fromValues', args...

  equal: (a, b) ->
    shim.log 'vec2', 'equal'
    return true if a is b
    for i in [0..1]
      return false unless Math.abs(a[i] - b[i]) < EPSILON
    true

  create:       (values)        ->
    shim.log 'vec2', 'values'
    if values
      shim.q 'vec2', 'clone', values
    else
      out = shim.q 'vec2', 'create'
      # 1.x set out to 0, 2.x sets to identity
      out[0] = out[1] = 0
      out
