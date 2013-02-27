shim = require 'shim'

EPSILON = 0.000001

module.exports =
  str:          (v)             -> shim('mat4', 'str', v).replace(/mat4\((.*?)\)/, '[$1]')
  scale:        (a, b, out = a) -> shim 'mat4', 'scale',         out, a, b
  rotate:       (a, angle, axis, out = a) -> shim 'mat4', 'rotate', out, a, angle, axis
  rotateX:      (a, angle, out = a) -> shim 'mat4', 'rotateX', out, a, angle
  rotateY:      (a, angle, out = a) -> shim 'mat4', 'rotateY', out, a, angle
  rotateZ:      (a, angle, out = a) -> shim 'mat4', 'rotateZ', out, a, angle
  multiply:     (a, b, out = a) -> shim 'mat4', 'multiply',      out, a, b
  determinant:  (a)             -> shim 'mat4', 'determinant',   a
  transpose:    (a, out = a)    -> shim 'mat4', 'transpose',     out, a
  identity: (a = mat4.create()) -> shim 'mat4', 'identity',      a
  createFrom:   (args...)       -> shim 'mat4', 'clone',         args
  translate:    (a, v, out = a) -> shim 'mat4', 'translate',     out, a, v

  set:          (src, out)      ->
    shim.log 'mat4', 'set'
    shim.q 'mat4', 'copy',          out, src

  toMat3:       (a, out = mat3.create()) ->
    shim.log 'mat4', 'toMat3'
    shim.q 'mat3', 'fromMat4', out, a

  multiplyVec3: (a, b, out = b) ->
    shim.log 'mat4', 'multiplyVec3'
    shim.q 'vec3', 'transformMat4', out, b, a

  multiplyVec4: (a, b, out = b) ->
    shim.log 'mat4', 'multiplyVec4'
    shim.q 'vec4', 'transformMat4', out, b, a

  inverse:      (a, out = a)    ->
    shim.log 'mat4', 'inverse'
    shim.q 'mat4', 'invert',        out, a
    
  frustum:      (left, right, bottom, top, near, far, out = mat4.create()) ->
    shim 'mat4', 'frustum', out, left, right, bottom, top, near, far

  perspective:  (fovy, aspect, near, far, dest = mat4.create()) ->
    shim 'mat4', 'perspective', dest, fovy, aspect, near, far

  ortho:      (left, right, bottom, top, near, far, out = mat4.create()) ->
    shim 'mat4', 'ortho', out, left, right, bottom, top, near, far

  lookAt:      (eye, center, up, out = mat4.create()) ->
    shim 'mat4', 'lookAt', out, eye, center, up

  fromRotationTranslation: (quat, vec, out = mat4.create()) ->
    shim 'mat4', 'fromRotationTranslation', out, quat, vec

  create:       (values)        ->
    shim.log 'mat4', 'create'
    if values
      shim.q 'mat4', 'clone', values
    else
      out = shim.q 'mat4', 'create'
      # 1.x set out to 0, 2.x sets to identity
      out[ 0] = out[ 1] = out[ 2] = out[ 3] =
      out[ 4] = out[ 5] = out[ 6] = out[ 7] =
      out[ 8] = out[ 9] = out[10] = out[11] =
      out[12] = out[13] = out[14] = out[15] = 0
      out

  equal: (a, b) ->
    shim.log 'mat4', 'equal'
    return true if a is b
    for i in [0..15]
      return false unless Math.abs(a[i] - b[i]) < EPSILON
    true

  toRotationMat: (a, out = mat4.create()) ->
    shim.log 'mat4', 'toRotationMat'
    shim.q 'mat4', 'identity', out
    for i in [0..2]
      for j in [0..2]
        out[i*4+j] = a[i*4+j]
    out

  toInverseMat3: (a, out = mat3.create()) ->
    shim.log 'mat4', 'toInverseMat3'
    for i in [0..2]
      for j in [0..2]
        out[i*3+j] = a[i*4+j]
    shim.q 'mat3', 'invert', out, out
