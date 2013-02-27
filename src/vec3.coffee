shim = require 'shim'

EPSILON = 0.000001

module.exports =
  lerp:         (a, b, l, out = a) -> shim 'vec3', 'lerp',      out, a, b, l
  dot:          (a, b)             -> shim 'vec3', 'dot',       a, b
  length:       (a)                -> shim 'vec3', 'length',    a
  cross:        (a, b, out = a)    -> shim 'vec3', 'cross',     out, a, b
  normalize:    (a, out = a)       -> shim 'vec3', 'normalize', out, a
  scale:        (a, amt, out = a)  -> shim 'vec3', 'scale',     out, a, amt
  negate:       (a, out = a)       -> shim 'vec3', 'negate',    out, a
  subtract:     (a, b, out = a)    -> shim 'vec3', 'subtract',  out, a, b
  multiply:     (a, b, out = a)    -> shim 'vec3', 'multiply',  out, a, b
  add:          (a, b, out = a)    -> shim 'vec3', 'add',       out, a, b
  squaredLength:(a)                -> shim 'vec3', 'squaredLength', a
  dist:         (a, b)             -> shim 'vec3', 'distance',  a, b

  set:          (src, out)         ->
    shim.log 'vec3', 'set'
    shim.q 'vec3', 'copy',      out, src

  equal: (a, b) ->
    shim.log 'vec3', 'equal'
    a is b or (
      Math.abs(a[0] - b[0]) < EPSILON and
      Math.abs(a[1] - b[1]) < EPSILON and
      Math.abs(a[2] - b[2]) < EPSILON
    )

  str: (v) ->
    shim.log 'vec3', 'str'
    shim.q('vec3', 'str', v).replace(/vec3\((.*)\)/, '[$1]')

  rotationTo:   (a, b, out = quat4.create()) -> 
    shim.log 'vec3', 'rotationTo'
    shim.q 'quat', 'rotationTo', out, a, b

  direction:    (a, b, out = a) ->
    shim.log 'vec3', 'direction'
    shim.q 'vec3', 'subtract', out, a, b
    shim.q 'vec3', 'normalize', out, out

  unproject:    (->
    unprojectMat = null
    unprojectVec = null

    (vec, view, proj, viewport, dest = vec) ->
      shim.log 'vec3', 'unproject'
      unprojectMat or= mat4.create()
      unprojectVec or= vec4.create()
      m = unprojectMat
      v = unprojectVec

      v[0] = (vec[0] - viewport[0]) * 2.0 / viewport[2] - 1.0
      v[1] = (vec[1] - viewport[1]) * 2.0 / viewport[3] - 1.0
      v[2] = 2.0 * vec[2] - 1.0
      v[3] = 1.0
      
      mat4.multiply proj, view, m
      if !mat4.inverse m then return null
      
      mat4.multiplyVec4 m, v
      if v[3] is 0.0 then return null

      dest[0] = v[0] / v[3]
      dest[1] = v[1] / v[3]
      dest[2] = v[2] / v[3]
      
      return dest
  )()

  createFrom: (x, y, z) ->
    shim.log 'vec3', 'createFrom'
    shim.q 'vec3', 'fromValues', x, y, z

  create:       (values)        ->
    shim.log 'vec3', 'create'
    if values
      shim.q 'vec3', 'clone', values
    else
      out = shim.q 'vec3', 'create'
      # 1.x set out to 0, 2.x sets to identity
      out[0] = out[1] = out[2] = 0
      out
