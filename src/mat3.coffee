shim = require 'shim'

EPSILON = 0.000001

module.exports =
  # str:          (v)             -> shim 'mat3', 'str',           v
  scale:        (a, b, out = a) -> shim 'mat3', 'scale',         out, a, b
  rotate:       (a, b, out = a) -> shim 'mat3', 'rotate',        out, a, b
  multiply:     (a, b, out = a) -> shim 'mat3', 'multiply',      out, a, b
  determinant:  (a)             -> shim 'mat3', 'determinant',   a
  transpose:    (a, out = a)    -> shim 'mat3', 'transpose',     out, a
  identity: (a = mat3.create()) -> shim 'mat3', 'identity',      a

  multiplyVec2: (a, b, out = b) ->
    shim.log 'mat3', 'multiplyVec2'
    shim.q 'vec2', 'transformMat3', out, b, a

  multiplyVec3: (a, b, out = b) ->
    shim.log 'mat3', 'multiplyVec3'
    shim.q 'vec3', 'transformMat3', out, b, a

  inverse:      (a, out = a)    ->
    shim.log 'mat3', 'inverse'
    shim.q 'mat3', 'invert',        out, a

  set:          (src, out)      ->
    shim.log 'mat3', 'set'
    shim.q 'mat3', 'copy',          out, src

  toQuat4:      (mat, q = quat4.create()) ->
    shim.log 'mat3', 'toQuat4'
    shim.q 'quat', 'fromMat3', q, mat

  createFrom:   (vals...)       ->
    shim.log 'mat3', 'clone'
    shim.q 'mat3', 'clone', vals

  create:       (values)        ->
    shim.log 'mat3', 'create'
    if values
      shim.q 'mat3', 'clone', values
    else
      out = shim.q 'mat3', 'create'
      # 1.x set out to 0, 2.x sets to identity
      out[0] = out[1] = out[2] =
      out[3] = out[4] = out[5] =
      out[6] = out[7] = out[8] = 0
      out

  equal: (a, b) ->
    shim.log 'mat3', 'equal', a, b
    a is b or (
      Math.abs(a[0] - b[0]) < EPSILON and
      Math.abs(a[1] - b[1]) < EPSILON and
      Math.abs(a[2] - b[2]) < EPSILON and
      Math.abs(a[3] - b[3]) < EPSILON and
      Math.abs(a[4] - b[4]) < EPSILON and
      Math.abs(a[5] - b[5]) < EPSILON and
      Math.abs(a[6] - b[6]) < EPSILON and
      Math.abs(a[7] - b[7]) < EPSILON and
      Math.abs(a[8] - b[8]) < EPSILON
    )

  toMat4: (mat, out = mat4.create()) ->
    shim.log 'mat3', 'toMat4', mat, out
    shim.q 'mat4', 'identity', out
    for i in [0..2]
      for j in [0..2]
        out[i*4+j] = mat[i*3+j]
    out
