(function(global) {
  function require(fn) { require.modules[fn](); }

  require.modules['gl-matrix'] = (function() {
    if (!global.glMatrix) {
      throw new Error("gl-matrix has not been loaded yet! "+
        "Make sure it appears before gl-matrix-shims.js in the load order.");
    }
    var result = {
      glMatrix: global.glMatrix,
      mat2: global.mat2,
      mat3: global.mat3,
      mat4: global.mat4,
      vec2: global.vec2,
      vec3: global.vec3,
      vec4: global.vec4,
      quat: global.quat
    };
    return function() { return result; }
  })();

  
    require.modules['gl-matrix-wrapper'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var glMatrix, mat2, mat3, mat4, quat, vec2, vec3, vec4, _ref;

  _ref = require('gl-matrix'), glMatrix = _ref.glMatrix, mat2 = _ref.mat2, mat3 = _ref.mat3, mat4 = _ref.mat4, vec2 = _ref.vec2, vec3 = _ref.vec3, vec4 = _ref.vec4, quat = _ref.quat;

  module.exports = {
    mat2: mat2,
    mat3: mat3,
    mat4: mat4,
    vec2: vec2,
    vec3: vec3,
    vec4: vec4,
    quat: quat,
    setMatrixArrayType: glMatrix.setMatrixArrayType,
    glMatrixArrayType: Array,
    MatrixArray: Array,
    determineMatrixArrayType: function() {
      return glMatrix.setMatrixArrayType(Array);
    },
    glMath: {
      invsqrt: function(a) {
        return 1 / Math.sqrt(a);
      }
    }
  };

}).call(this);


      })(module, module.exports);
      require.modules['gl-matrix-wrapper'] = function() { return module.exports; };
      return module.exports;
    };
  
    require.modules['vec3'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var EPSILON, shim;

  shim = require('shim');

  EPSILON = 0.000001;

  module.exports = {
    lerp: function(a, b, l, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec3', 'lerp', out, a, b, l);
    },
    dot: function(a, b) {
      return shim('vec3', 'dot', a, b);
    },
    length: function(a) {
      return shim('vec3', 'length', a);
    },
    cross: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec3', 'cross', out, a, b);
    },
    normalize: function(a, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec3', 'normalize', out, a);
    },
    scale: function(a, amt, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec3', 'scale', out, a, amt);
    },
    negate: function(a, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec3', 'negate', out, a);
    },
    subtract: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec3', 'subtract', out, a, b);
    },
    multiply: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec3', 'multiply', out, a, b);
    },
    add: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec3', 'add', out, a, b);
    },
    squaredLength: function(a) {
      return shim('vec3', 'squaredLength', a);
    },
    dist: function(a, b) {
      return shim('vec3', 'distance', a, b);
    },
    set: function(src, out) {
      shim.log('vec3', 'set');
      return shim.q('vec3', 'copy', out, src);
    },
    equal: function(a, b) {
      shim.log('vec3', 'equal');
      return a === b || (Math.abs(a[0] - b[0]) < EPSILON && Math.abs(a[1] - b[1]) < EPSILON && Math.abs(a[2] - b[2]) < EPSILON);
    },
    str: function(v) {
      shim.log('vec3', 'str');
      return shim.q('vec3', 'str', v).replace(/vec3\((.*)\)/, '[$1]');
    },
    rotationTo: function(a, b, out) {
      if (out == null) {
        out = quat4.create();
      }
      shim.log('vec3', 'rotationTo');
      return shim.q('quat', 'rotationTo', out, a, b);
    },
    direction: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      shim.log('vec3', 'direction');
      shim.q('vec3', 'subtract', out, a, b);
      return shim.q('vec3', 'normalize', out, out);
    },
    unproject: (function() {
      var unprojectMat, unprojectVec;
      unprojectMat = null;
      unprojectVec = null;
      return function(vec, view, proj, viewport, dest) {
        var m, v;
        if (dest == null) {
          dest = vec;
        }
        shim.log('vec3', 'unproject');
        unprojectMat || (unprojectMat = mat4.create());
        unprojectVec || (unprojectVec = vec4.create());
        m = unprojectMat;
        v = unprojectVec;
        v[0] = (vec[0] - viewport[0]) * 2.0 / viewport[2] - 1.0;
        v[1] = (vec[1] - viewport[1]) * 2.0 / viewport[3] - 1.0;
        v[2] = 2.0 * vec[2] - 1.0;
        v[3] = 1.0;
        mat4.multiply(proj, view, m);
        if (!mat4.inverse(m)) {
          return null;
        }
        mat4.multiplyVec4(m, v);
        if (v[3] === 0.0) {
          return null;
        }
        dest[0] = v[0] / v[3];
        dest[1] = v[1] / v[3];
        dest[2] = v[2] / v[3];
        return dest;
      };
    })(),
    createFrom: function(x, y, z) {
      shim.log('vec3', 'createFrom');
      return shim.q('vec3', 'fromValues', x, y, z);
    },
    create: function(values) {
      var out;
      shim.log('vec3', 'create');
      if (values) {
        return shim.q('vec3', 'clone', values);
      } else {
        out = shim.q('vec3', 'create');
        out[0] = out[1] = out[2] = 0;
        return out;
      }
    }
  };

}).call(this);


      })(module, module.exports);
      require.modules['vec3'] = function() { return module.exports; };
      return module.exports;
    };
  
    require.modules['mat4'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var EPSILON, shim,
    __slice = [].slice;

  shim = require('shim');

  EPSILON = 0.000001;

  module.exports = {
    str: function(v) {
      return shim('mat4', 'str', v).replace(/mat4\((.*?)\)/, '[$1]');
    },
    scale: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat4', 'scale', out, a, b);
    },
    rotate: function(a, angle, axis, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat4', 'rotate', out, a, angle, axis);
    },
    rotateX: function(a, angle, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat4', 'rotateX', out, a, angle);
    },
    rotateY: function(a, angle, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat4', 'rotateY', out, a, angle);
    },
    rotateZ: function(a, angle, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat4', 'rotateZ', out, a, angle);
    },
    multiply: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat4', 'multiply', out, a, b);
    },
    determinant: function(a) {
      return shim('mat4', 'determinant', a);
    },
    transpose: function(a, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat4', 'transpose', out, a);
    },
    identity: function(a) {
      if (a == null) {
        a = mat4.create();
      }
      return shim('mat4', 'identity', a);
    },
    createFrom: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return shim('mat4', 'clone', args);
    },
    translate: function(a, v, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat4', 'translate', out, a, v);
    },
    set: function(src, out) {
      shim.log('mat4', 'set');
      return shim.q('mat4', 'copy', out, src);
    },
    toMat3: function(a, out) {
      if (out == null) {
        out = mat3.create();
      }
      shim.log('mat4', 'toMat3');
      return shim.q('mat3', 'fromMat4', out, a);
    },
    multiplyVec3: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      shim.log('mat4', 'multiplyVec3');
      return shim.q('vec3', 'transformMat4', out, b, a);
    },
    multiplyVec4: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      shim.log('mat4', 'multiplyVec4');
      return shim.q('vec4', 'transformMat4', out, b, a);
    },
    inverse: function(a, out) {
      if (out == null) {
        out = a;
      }
      shim.log('mat4', 'inverse');
      return shim.q('mat4', 'invert', out, a);
    },
    frustum: function(left, right, bottom, top, near, far, out) {
      if (out == null) {
        out = mat4.create();
      }
      return shim('mat4', 'frustum', out, left, right, bottom, top, near, far);
    },
    perspective: function(fovy, aspect, near, far, dest) {
      if (dest == null) {
        dest = mat4.create();
      }
      return shim('mat4', 'perspective', dest, fovy, aspect, near, far);
    },
    ortho: function(left, right, bottom, top, near, far, out) {
      if (out == null) {
        out = mat4.create();
      }
      return shim('mat4', 'ortho', out, left, right, bottom, top, near, far);
    },
    lookAt: function(eye, center, up, out) {
      if (out == null) {
        out = mat4.create();
      }
      return shim('mat4', 'lookAt', out, eye, center, up);
    },
    fromRotationTranslation: function(quat, vec, out) {
      if (out == null) {
        out = mat4.create();
      }
      return shim('mat4', 'fromRotationTranslation', out, quat, vec);
    },
    create: function(values) {
      var out;
      shim.log('mat4', 'create');
      if (values) {
        return shim.q('mat4', 'clone', values);
      } else {
        out = shim.q('mat4', 'create');
        out[0] = out[1] = out[2] = out[3] = out[4] = out[5] = out[6] = out[7] = out[8] = out[9] = out[10] = out[11] = out[12] = out[13] = out[14] = out[15] = 0;
        return out;
      }
    },
    equal: function(a, b) {
      var i, _i;
      shim.log('mat4', 'equal');
      if (a === b) {
        return true;
      }
      for (i = _i = 0; _i <= 15; i = ++_i) {
        if (!(Math.abs(a[i] - b[i]) < EPSILON)) {
          return false;
        }
      }
      return true;
    },
    toRotationMat: function(a, out) {
      var i, j, _i, _j;
      if (out == null) {
        out = mat4.create();
      }
      shim.log('mat4', 'toRotationMat');
      shim.q('mat4', 'identity', out);
      for (i = _i = 0; _i <= 2; i = ++_i) {
        for (j = _j = 0; _j <= 2; j = ++_j) {
          out[i * 4 + j] = a[i * 4 + j];
        }
      }
      return out;
    },
    toInverseMat3: function(a, out) {
      var i, j, _i, _j;
      if (out == null) {
        out = mat3.create();
      }
      shim.log('mat4', 'toInverseMat3');
      for (i = _i = 0; _i <= 2; i = ++_i) {
        for (j = _j = 0; _j <= 2; j = ++_j) {
          out[i * 3 + j] = a[i * 4 + j];
        }
      }
      return shim.q('mat3', 'invert', out, out);
    }
  };

}).call(this);


      })(module, module.exports);
      require.modules['mat4'] = function() { return module.exports; };
      return module.exports;
    };
  
    require.modules['mat2'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var EPSILON, shim,
    __slice = [].slice;

  shim = require('shim');

  EPSILON = 0.000001;

  module.exports = {
    scale: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat2', 'scale', out, a, b);
    },
    rotate: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat2', 'rotate', out, a, b);
    },
    multiply: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat2', 'multiply', out, a, b);
    },
    determinant: function(a) {
      return shim('mat2', 'determinant', a);
    },
    transpose: function(a, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat2', 'transpose', out, a);
    },
    identity: function(a) {
      if (a == null) {
        a = mat2.create();
      }
      return shim('mat2', 'identity', a);
    },
    str: function(v) {
      return shim('mat2', 'str', v).replace(/mat2\((.*)\)/, '[$1]');
    },
    multiplyVec2: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      shim.log('mat2', 'multiplyVec2');
      return shim.q('vec2', 'transformMat2', out, b, a);
    },
    inverse: function(a, out) {
      if (out == null) {
        out = a;
      }
      shim.log('mat2', 'inverse');
      return shim.q('mat2', 'invert', out, a);
    },
    set: function(src, out) {
      shim.log('mat2', 'set');
      return shim.q('mat2', 'copy', out, src);
    },
    createFrom: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      shim.log('mat2', 'createFrom');
      return shim.q('mat2', 'clone', args);
    },
    equal: function(a, b) {
      var i, _i;
      shim.log('mat2', 'equal', a, b);
      if (a === b) {
        return true;
      }
      for (i = _i = 0; _i <= 3; i = ++_i) {
        if (!(Math.abs(a[i] - b[i]) < EPSILON)) {
          return false;
        }
      }
      return true;
    },
    create: function(values) {
      var out;
      shim.log('mat2', 'create', values);
      if (values) {
        return shim.q('mat2', 'clone', values);
      } else {
        out = shim.q('mat2', 'create');
        out[0] = out[1] = out[2] = out[3] = 0;
        return out;
      }
    }
  };

}).call(this);


      })(module, module.exports);
      require.modules['mat2'] = function() { return module.exports; };
      return module.exports;
    };
  
    require.modules['mat3'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var EPSILON, shim,
    __slice = [].slice;

  shim = require('shim');

  EPSILON = 0.000001;

  module.exports = {
    scale: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat3', 'scale', out, a, b);
    },
    rotate: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat3', 'rotate', out, a, b);
    },
    multiply: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat3', 'multiply', out, a, b);
    },
    determinant: function(a) {
      return shim('mat3', 'determinant', a);
    },
    transpose: function(a, out) {
      if (out == null) {
        out = a;
      }
      return shim('mat3', 'transpose', out, a);
    },
    identity: function(a) {
      if (a == null) {
        a = mat3.create();
      }
      return shim('mat3', 'identity', a);
    },
    multiplyVec2: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      shim.log('mat3', 'multiplyVec2');
      return shim.q('vec2', 'transformMat3', out, b, a);
    },
    multiplyVec3: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      shim.log('mat3', 'multiplyVec3');
      return shim.q('vec3', 'transformMat3', out, b, a);
    },
    inverse: function(a, out) {
      if (out == null) {
        out = a;
      }
      shim.log('mat3', 'inverse');
      return shim.q('mat3', 'invert', out, a);
    },
    set: function(src, out) {
      shim.log('mat3', 'set');
      return shim.q('mat3', 'copy', out, src);
    },
    toQuat4: function(mat, q) {
      if (q == null) {
        q = quat4.create();
      }
      shim.log('mat3', 'toQuat4');
      return shim.q('quat', 'fromMat3', q, mat);
    },
    createFrom: function() {
      var vals;
      vals = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      shim.log('mat3', 'clone');
      return shim.q('mat3', 'clone', vals);
    },
    create: function(values) {
      var out;
      shim.log('mat3', 'create');
      if (values) {
        return shim.q('mat3', 'clone', values);
      } else {
        out = shim.q('mat3', 'create');
        out[0] = out[1] = out[2] = out[3] = out[4] = out[5] = out[6] = out[7] = out[8] = 0;
        return out;
      }
    },
    equal: function(a, b) {
      shim.log('mat3', 'equal', a, b);
      return a === b || (Math.abs(a[0] - b[0]) < EPSILON && Math.abs(a[1] - b[1]) < EPSILON && Math.abs(a[2] - b[2]) < EPSILON && Math.abs(a[3] - b[3]) < EPSILON && Math.abs(a[4] - b[4]) < EPSILON && Math.abs(a[5] - b[5]) < EPSILON && Math.abs(a[6] - b[6]) < EPSILON && Math.abs(a[7] - b[7]) < EPSILON && Math.abs(a[8] - b[8]) < EPSILON);
    },
    toMat4: function(mat, out) {
      var i, j, _i, _j;
      if (out == null) {
        out = mat4.create();
      }
      shim.log('mat3', 'toMat4', mat, out);
      shim.q('mat4', 'identity', out);
      for (i = _i = 0; _i <= 2; i = ++_i) {
        for (j = _j = 0; _j <= 2; j = ++_j) {
          out[i * 4 + j] = mat[i * 3 + j];
        }
      }
      return out;
    }
  };

}).call(this);


      })(module, module.exports);
      require.modules['mat3'] = function() { return module.exports; };
      return module.exports;
    };
  
    require.modules['gl-matrix-shims'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var GLMatrix;

  GLMatrix = require('gl-matrix-wrapper');

  global.setMatrixArrayType = function(a) {
    return GLMatrix.setMatrixArrayType(a);
  };

  global.mat2 = require('mat2');

  global.mat3 = require('mat3');

  global.mat4 = require('mat4');

  global.vec2 = require('vec2');

  global.vec3 = require('vec3');

  global.vec4 = require('vec4');

  global.quat4 = require('quat4');

  global.GLMatrix = GLMatrix;

}).call(this);


      })(module, module.exports);
      require.modules['gl-matrix-shims'] = function() { return module.exports; };
      return module.exports;
    };
  
    require.modules['vec2'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var EPSILON, shim, tmp,
    __slice = [].slice;

  shim = require('shim');

  tmp = [0, 0, 0];

  EPSILON = 0.000001;

  module.exports = {
    divide: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      return shim('vec2', 'divide', out, a, b);
    },
    multiply: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      return shim('vec2', 'multiply', out, a, b);
    },
    subtract: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      return shim('vec2', 'subtract', out, a, b);
    },
    add: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      return shim('vec2', 'add', out, a, b);
    },
    scale: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec2', 'scale', out, a, b);
    },
    dist: function(a, b) {
      return shim('vec2', 'dist', a, b);
    },
    negate: function(a, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec2', 'negate', out, a);
    },
    normalize: function(a, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec2', 'normalize', out, a);
    },
    length: function(a) {
      return shim('vec2', 'length', a);
    },
    dot: function(a, b) {
      return shim('vec2', 'dot', a, b);
    },
    lerp: function(a, b, amt, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec2', 'lerp', out, a, b, amt);
    },
    squaredLength: function(a) {
      return shim('vec2', 'squaredLength', a);
    },
    set: function(a, out) {
      shim.log('vec2', 'set');
      return shim.q('vec2', 'copy', out, a);
    },
    str: function(v) {
      shim.log('vec2', 'str');
      return shim.q('vec2', 'str', v).replace(/vec2\((.*)\)/, '[$1]');
    },
    direction: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      shim.log('vec2', 'direction');
      return shim.q('vec2', 'normalize', out, shim.q('vec2', 'subtract', out, a, b));
    },
    cross: function(a, b, out) {
      shim.log('vec2', 'cross');
      if (out) {
        return shim.q('vec2', 'cross', out, a, b);
      } else {
        shim.q('vec2', 'cross', tmp, a, b);
        return tmp[2];
      }
    },
    createFrom: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      shim.log('vec2', 'createFrom');
      return shim.q.apply(shim, ['vec2', 'fromValues'].concat(__slice.call(args)));
    },
    equal: function(a, b) {
      var i, _i;
      shim.log('vec2', 'equal');
      if (a === b) {
        return true;
      }
      for (i = _i = 0; _i <= 1; i = ++_i) {
        if (!(Math.abs(a[i] - b[i]) < EPSILON)) {
          return false;
        }
      }
      return true;
    },
    create: function(values) {
      var out;
      shim.log('vec2', 'values');
      if (values) {
        return shim.q('vec2', 'clone', values);
      } else {
        out = shim.q('vec2', 'create');
        out[0] = out[1] = 0;
        return out;
      }
    }
  };

}).call(this);


      })(module, module.exports);
      require.modules['vec2'] = function() { return module.exports; };
      return module.exports;
    };
  
    require.modules['shim'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var GLMatrix,
    __slice = [].slice;

  GLMatrix = require('gl-matrix-wrapper');

  module.exports = function() {
    var args, name, type, _ref, _ref1;
    type = arguments[0], name = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    (_ref = module.exports).log.apply(_ref, [type, name].concat(__slice.call(args)));
    return (_ref1 = module.exports).q.apply(_ref1, [type, name].concat(__slice.call(args)));
  };

  module.exports.q = function() {
    var args, name, type, _ref;
    type = arguments[0], name = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (!GLMatrix[type][name]) {
      throw new Error("Undefined: GLMatrix." + type + "." + name);
    }
    return (_ref = GLMatrix[type])[name].apply(_ref, args);
  };

  module.exports.log = function(type, name) {
    if (!GLMatrix.noisy) {
      return;
    }
    return console.log("Warning: SHIMMED call to GLMatrix v1.x:", "" + type + "." + name);
  };

}).call(this);


      })(module, module.exports);
      require.modules['shim'] = function() { return module.exports; };
      return module.exports;
    };
  
    require.modules['vec4'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var EPSILON, shim,
    __slice = [].slice;

  shim = require('shim');

  EPSILON = 0.000001;

  module.exports = {
    divide: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      return shim('vec4', 'divide', out, a, b);
    },
    multiply: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      return shim('vec4', 'multiply', out, a, b);
    },
    subtract: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      return shim('vec4', 'subtract', out, a, b);
    },
    add: function(a, b, out) {
      if (out == null) {
        out = b;
      }
      return shim('vec4', 'add', out, a, b);
    },
    scale: function(a, s, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec4', 'scale', out, a, s);
    },
    negate: function(a, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec4', 'negate', out, a);
    },
    lerp: function(a, b, l, out) {
      if (out == null) {
        out = a;
      }
      return shim('vec4', 'lerp', out, a, b, l);
    },
    length: function(a) {
      return shim('vec4', 'length', a);
    },
    squaredLength: function(a) {
      return shim('vec4', 'squaredLength', a);
    },
    set: function(a, out) {
      shim.log('vec4', 'set');
      return shim.q('vec4', 'copy', out, a);
    },
    createFrom: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      shim.log('vec4', 'createFrom');
      return shim.q('vec4', 'clone', args);
    },
    str: function(v) {
      shim.log('vec4', 'str');
      return shim.q('vec4', 'str', v).replace(/vec4\((.*)\)/, '[$1]');
    },
    equal: function(a, b) {
      var i, _i;
      shim.log('vec4', 'equal');
      if (a === b) {
        return true;
      }
      for (i = _i = 0; _i <= 3; i = ++_i) {
        if (!(Math.abs(a[i] - b[i]) < EPSILON)) {
          return false;
        }
      }
      return true;
    },
    create: function(values) {
      var out;
      shim.log('vec4', 'create');
      if (values) {
        return shim.q('vec4', 'clone', values);
      } else {
        out = shim.q('vec4', 'create');
        out[0] = out[1] = out[2] = out[3] = 0;
        return out;
      }
    }
  };

}).call(this);


      })(module, module.exports);
      require.modules['vec4'] = function() { return module.exports; };
      return module.exports;
    };
  
    require.modules['quat4'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        // Generated by CoffeeScript 1.4.0
(function() {
  var EPSILON, shim,
    __slice = [].slice;

  shim = require('shim');

  EPSILON = 0.000001;

  module.exports = {
    str: function(v) {
      shim.log('quat4', 'str');
      return shim.q('quat', 'str', v).replace(/quat\((.*)\)/, '[$1]');
    },
    multiplyVec3: function(q, a, out) {
      if (out == null) {
        out = a;
      }
      shim.log('quat4', 'multiplyVec3');
      return shim.q('vec3', 'transformQuat', out, a, q);
    },
    scale: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      shim.log('quat4', 'scale');
      return shim.q('quat', 'scale', out, a, b);
    },
    set: function(a, out) {
      shim.log('quat4', 'copy');
      return shim.q('quat', 'copy', out, a);
    },
    calculateW: function(a, out) {
      if (out == null) {
        out = a;
      }
      shim.log('quat4', 'calculateW');
      return shim.q('quat', 'calculateW', out, a);
    },
    dot: function(a, b) {
      shim.log('quat4', 'dot');
      return shim.q('quat', 'dot', a, b);
    },
    inverse: function(a, out) {
      if (out == null) {
        out = a;
      }
      shim.log('quat4', 'inverse');
      return shim.q('quat', 'invert', out, a);
    },
    conjugate: function(a, out) {
      if (out == null) {
        out = a;
      }
      shim.log('quat4', 'conjugate');
      return shim.q('quat', 'conjugate', out, a);
    },
    normalize: function(a, out) {
      if (out == null) {
        out = a;
      }
      shim.log('quat4', 'normalize');
      return shim.q('quat', 'normalize', out, a);
    },
    length: function(a) {
      shim.log('quat4', 'length');
      return shim.q('quat', 'length', a);
    },
    add: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      shim.log('quat4', 'add');
      return shim.q('quat', 'add', out, a, b);
    },
    multiply: function(a, b, out) {
      if (out == null) {
        out = a;
      }
      shim.log('quat4', 'multiply');
      return shim.q('quat', 'multiply', out, a, b);
    },
    toMat3: function(a, out) {
      if (out == null) {
        out = mat3.create();
      }
      shim.log('quat4', 'toMat3');
      return shim.q('mat3', 'fromQuat', out, a);
    },
    toMat4: function(a, out) {
      if (out == null) {
        out = mat4.create();
      }
      shim.log('quat4', 'toMat4');
      return shim.q('mat4', 'fromQuat', out, a);
    },
    slerp: function(a, b, amt, out) {
      if (out == null) {
        out = a;
      }
      shim.log('quat4', 'slerp');
      return shim.q('quat', 'slerp', out, a, b, amt);
    },
    equal: function(a, b) {
      var i, _i;
      shim.log('quat4', 'equal');
      if (a === b) {
        return true;
      }
      for (i = _i = 0; _i <= 3; i = ++_i) {
        if (!(Math.abs(a[i] - b[i]) < EPSILON)) {
          return false;
        }
      }
      return true;
    },
    fromAxes: function(view, right, up, out) {
      if (out == null) {
        out = quat4.create();
      }
      shim.log('quat4', 'fromAxes');
      return shim.q('quat', 'setAxes', out, view, right, up);
    },
    identity: function(q) {
      if (q == null) {
        q = quat4.create();
      }
      shim.log('quat4', 'identity');
      return shim.q('quat', 'identity', q);
    },
    fromRotationMatrix: function(mat, q) {
      if (q == null) {
        q = quat4.create();
      }
      shim.log('quat4', 'fromRotationMatrix');
      return shim.q('quat', 'fromMat3', q, mat);
    },
    toQuat4: function(mat, q) {
      shim.log('quat4', 'toQuat4');
      return shim.q('quat', 'fromMat3', q, mat);
    },
    fromAngleAxis: function(angle, axis, out) {
      if (out == null) {
        out = quat4.create();
      }
      shim.log('quat4', 'fromAngleAxis');
      return shim.q('quat', 'setAxisAngle', out, axis, angle);
    },
    toAngleAxis: function(q, out) {
      var invlen, sqrlen;
      if (out == null) {
        out = q;
      }
      shim.log('quat4', 'toAngleAxis');
      sqrlen = q[0] * q[0] + q[1] * q[1] + q[2] * q[2];
      if (sqrlen > 0) {
        out[3] = 2 * Math.acos(q[3]);
        invlen = 1 / Math.sqrt(sqrlen);
        out[0] = q[0] * invlen;
        out[1] = q[1] * invlen;
        out[2] = q[2] * invlen;
      } else {
        out[3] = 0;
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
      }
      return out;
    },
    createFrom: function() {
      var vals;
      vals = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      shim.log('quat4', 'createFrom');
      return shim.q.apply(shim, ['quat', 'fromValues'].concat(__slice.call(vals)));
    },
    create: function(values) {
      var out;
      shim.log('quat4', 'create');
      if (values) {
        return shim.q('quat', 'clone', values);
      } else {
        out = shim.q('quat', 'create');
        out[0] = out[1] = out[2] = out[3] = 0;
        return out;
      }
    }
  };

}).call(this);


      })(module, module.exports);
      require.modules['quat4'] = function() { return module.exports; };
      return module.exports;
    };
  
})(this);