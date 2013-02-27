GLMatrix = require 'gl-matrix-wrapper'
global.setMatrixArrayType = (a) -> GLMatrix.setMatrixArrayType a

# place or replace all gl-matrix v1.x objects
global.mat2 = require 'mat2'
global.mat3 = require 'mat3'
global.mat4 = require 'mat4'
global.vec2 = require 'vec2'
global.vec3 = require 'vec3'
global.vec4 = require 'vec4'
global.quat4= require 'quat4'


global.GLMatrix = GLMatrix
