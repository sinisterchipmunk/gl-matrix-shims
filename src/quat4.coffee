shim = require 'shim'

EPSILON = 0.000001

module.exports =
  str:          (v)             -> 
    shim.log 'quat4', 'str'
    shim.q('quat', 'str', v).replace /quat\((.*)\)/, '[$1]'

  multiplyVec3: (q, a, out = a) -> 
    shim.log 'quat4', 'multiplyVec3'
    shim.q 'vec3', 'transformQuat', out, a, q

  scale:        (a, b, out = a) -> 
    shim.log 'quat4', 'scale'
    shim.q 'quat', 'scale', out, a, b

  set:          (a, out)        -> 
    shim.log 'quat4', 'copy'
    shim.q 'quat', 'copy', out, a

  calculateW:   (a, out = a)    -> 
    shim.log 'quat4', 'calculateW'
    shim.q 'quat', 'calculateW', out, a

  dot:          (a, b)          -> 
    shim.log 'quat4', 'dot'
    shim.q 'quat', 'dot', a, b

  inverse:      (a, out = a)    -> 
    shim.log 'quat4', 'inverse'
    shim.q 'quat', 'invert', out, a

  conjugate:    (a, out = a)    -> 
    shim.log 'quat4', 'conjugate'
    shim.q 'quat', 'conjugate', out, a

  normalize:    (a, out = a)    -> 
    shim.log 'quat4', 'normalize'
    shim.q 'quat', 'normalize', out, a

  length:       (a)             -> 
    shim.log 'quat4', 'length'
    shim.q 'quat', 'length', a

  add:          (a, b, out = a) -> 
    shim.log 'quat4', 'add'
    shim.q 'quat', 'add', out, a, b

  multiply:     (a, b, out = a) -> 
    shim.log 'quat4', 'multiply'
    shim.q 'quat', 'multiply', out, a, b

  toMat3:       (a, out = mat3.create()) -> 
    shim.log 'quat4', 'toMat3'
    shim.q 'mat3', 'fromQuat', out, a

  toMat4:       (a, out = mat4.create()) -> 
    shim.log 'quat4', 'toMat4'
    shim.q 'mat4', 'fromQuat', out, a

  slerp:        (a, b, amt, out = a) -> 
    shim.log 'quat4', 'slerp'
    shim.q 'quat', 'slerp', out, a, b, amt

  equal: (a, b) ->
    shim.log 'quat4', 'equal'
    return true if a is b
    for i in [0..3]
      return false unless Math.abs(a[i] - b[i]) < EPSILON
    true

  fromAxes:     (view, right, up, out = quat4.create()) ->
    shim.log 'quat4', 'fromAxes'
    shim.q 'quat', 'setAxes', out, view, right, up

  identity:     (q = quat4.create()) ->
    shim.log 'quat4', 'identity'
    shim.q 'quat', 'identity', q

  fromRotationMatrix: (mat, q = quat4.create()) ->
    shim.log 'quat4', 'fromRotationMatrix'
    shim.q 'quat', 'fromMat3', q, mat

  toQuat4: (mat, q) ->
    shim.log 'quat4', 'toQuat4'
    shim.q 'quat', 'fromMat3', q, mat

  fromAngleAxis: (angle, axis, out = quat4.create()) ->
    shim.log 'quat4', 'fromAngleAxis'
    shim.q 'quat', 'setAxisAngle', out, axis, angle

  toAngleAxis:  (q, out = q) ->
    shim.log 'quat4', 'toAngleAxis'
    sqrlen = q[0]*q[0]+q[1]*q[1]+q[2]*q[2]
    if sqrlen > 0
      out[3] = 2 * Math.acos q[3]
      invlen = 1 / Math.sqrt sqrlen
      out[0] = q[0] * invlen
      out[1] = q[1] * invlen
      out[2] = q[2] * invlen
    else
      # angle is 0 (mod 2*pi), so any axis will do
      out[3] = 0
      out[0] = 1
      out[1] = 0
      out[2] = 0
    out

  createFrom: (vals...) ->
    shim.log 'quat4', 'createFrom'
    shim.q 'quat', 'fromValues', vals...

  create:       (values)        ->
    shim.log 'quat4', 'create'
    if values
      shim.q 'quat', 'clone', values
    else
      out = shim.q 'quat', 'create'
      # 1.x set out to 0, 2.x sets to identity
      out[0] = out[1] = out[2] = out[3] = 0
      out
