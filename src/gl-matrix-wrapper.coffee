{glMatrix, mat2, mat3, mat4, vec2, vec3, vec4, quat} = require 'gl-matrix'

module.exports =
  mat2: mat2
  mat3: mat3
  mat4: mat4
  vec2: vec2
  vec3: vec3
  vec4: vec4
  quat: quat
  setMatrixArrayType: glMatrix.setMatrixArrayType
  glMatrixArrayType: Array
  MatrixArray: Array
  determineMatrixArrayType: -> glMatrix.setMatrixArrayType Array
  glMath:
    invsqrt: (a) -> 1 / Math.sqrt(a)
