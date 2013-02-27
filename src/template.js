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

  {% for (var i = 0; i < files.length; i++) { %}
    require.modules['{{ files[i].filename }}'] = function() {
      var module = { exports: {} };
      (function(module, exports) {
        
        {{ files[i].source }}

      })(module, module.exports);
      require.modules['{{ files[i].filename }}'] = function() { return module.exports; };
      return module.exports;
    };
  {% } %}
})(this);
