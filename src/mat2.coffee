shim = require 'shim'

EPSILON = 0.000001

module.exports =
  scale:        (a, b, out = a) -> shim 'mat2', 'scale',         out, a, b
  rotate:       (a, b, out = a) -> shim 'mat2', 'rotate',        out, a, b
  multiply:     (a, b, out = a) -> shim 'mat2', 'multiply',      out, a, b
  determinant:  (a)             -> shim 'mat2', 'determinant',   a
  transpose:    (a, out = a)    -> shim 'mat2', 'transpose',     out, a
  identity: (a = mat2.create()) -> shim 'mat2', 'identity',      a
  str: (v) -> shim('mat2', 'str', v).replace(/mat2\((.*)\)/, '[$1]')

  multiplyVec2: (a, b, out = b) ->
    shim.log 'mat2', 'multiplyVec2'
    shim.q 'vec2', 'transformMat2', out, b, a

  inverse:      (a, out = a)    ->
    shim.log 'mat2', 'inverse'
    shim.q 'mat2', 'invert',        out, a

  set:          (src, out)      ->
    shim.log 'mat2', 'set'
    shim.q 'mat2', 'copy',          out, src

  createFrom:   (args...)       ->
    shim.log 'mat2', 'createFrom'
    shim.q 'mat2', 'clone',         args

  equal: (a, b) ->
    shim.log 'mat2', 'equal', a, b
    return true if a is b
    for i in [0..3]
      return false unless Math.abs(a[i] - b[i]) < EPSILON
    true

  create:       (values)        ->
    shim.log 'mat2', 'create', values
    if values
      shim.q 'mat2', 'clone', values
    else
      out = shim.q 'mat2', 'create'
      # 1.x set out to 0, 2.x sets to identity
      out[0] = out[1] = out[2] = out[3] = 0
      out
