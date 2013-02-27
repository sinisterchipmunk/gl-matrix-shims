describe("quat4", function() {
  var dest;
  beforeEach(function() { dest = quat4.create(); });

  describe("backtested", function() {
    // these methods weren't tested in 1.x

    describe("createFrom", function() {
      it("should work", function() {
        expect(quat4.createFrom(1,2,3,4)).toBeEqualish([1,2,3,4]);
      });
    });

    describe("set", function() {
      it("should work", function() {
        expect(quat4.set([1,2,3,4], [])).toBeEqualish([1,2,3,4]);
      });
    });

    describe("equal", function() {
      it("should work", function() {
        expect(quat4.equal([1,2,3,4], [1,2,3,4])).toBeTruthy();
        expect(quat4.equal([1,2,3,4], [1,2,3,5])).toBeFalsy();
      });
    });

    describe("calculateW", function() {
      it("should work", function() {
        expect(quat4.calculateW([1,2,3,0], [])).toBeEqualish([1,2,3, -3.605551275463989]);
        var a = [];
        quat4.calculateW([1,2,3,0], a);
        expect(a).toBeEqualish([1,2,3, -3.605551275463989]);
      });
    });

    describe("dot", function() {
      it("should work", function() {
        expect(quat4.dot([1,2,3,4], [4,3,2,1])).toBeEqualish(20);
      });
    });

    describe("length", function() {
      it("should work", function() {
        expect(quat4.length([1,2,3,4])).toBeEqualish(5.477225575051661);
      });
    });

    describe("str", function() {
      it("should work", function() {
        expect(quat4.str([1,2,3,4])).toBeEqualish('[1, 2, 3, 4]');
      });
    });

    describe("inverse", function() {
      it("should work", function() {
        expect(quat4.inverse([1,2,3,0])).toBeEqualish([ -0.07142857142857142, -0.14285714285714285, -0.21428571428571427, 0 ]);
        var a = [];
        quat4.inverse([1,2,3,0], a);
        expect(a).toBeEqualish([ -0.07142857142857142, -0.14285714285714285, -0.21428571428571427, 0 ]);
      });
    });

    describe("conjugate", function() {
      it("should work", function() {
        expect(quat4.conjugate([1,2,3,0])).toBeEqualish([-1,-2,-3,0]);
        var a = [];
        quat4.conjugate([1,2,3,0], a);
        expect(a).toBeEqualish([-1,-2,-3,0]);
      });
    });

    describe("normalize", function() {
      it("should work", function() {
        expect(quat4.normalize([1,2,3,0])).toBeEqualish( [ 0.2672612419124244, 0.5345224838248488, 0.8017837257372732, 0 ] );
        var a = [];
        quat4.normalize([1,2,3,0], a);
        expect(a).toBeEqualish( [ 0.2672612419124244, 0.5345224838248488, 0.8017837257372732, 0 ] );
      });
    });

    describe("add", function() {
      it("should work", function() {
        expect(quat4.add([1,2,3,0], [0,3,2,1])).toBeEqualish( [1,5,5,1] );
        var a = [];
        quat4.add([1,2,3,0],  [0,3,2,1], a);
        expect(a).toBeEqualish( [ 1,5,5,1 ] );
      });
    });

    describe("multiply", function() {
      it("should work", function() {
        expect(quat4.multiply([1,2,3,0], [0,3,2,1])).toBeEqualish( [-4, 0, 6, -12] );
        var a = [];
        quat4.multiply([1,2,3,0],  [0,3,2,1], a);
        expect(a).toBeEqualish( [-4, 0, 6, -12] );
      });
    });

    describe("scale", function() {
      it("should work", function() {
        expect(quat4.scale([1,2,3,0], 3)).toBeEqualish( [ 3, 6, 9, 0 ] );
        var a = [];
        quat4.scale([1,2,3,0],  3, a);
        expect(a).toBeEqualish( [ 3, 6, 9, 0 ] );
      });
    });

    describe("slerp", function() {
      it("should work", function() {
        expect(quat4.slerp([1,2,3,0], [3,2,1,0], 0.5)).toBeEqualish([ 2, 2, 2, 0 ]);
        var a = [];
        quat4.slerp([1,2,3,0], [3,2,1,0], 0.5, a);
        expect(a).toBeEqualish([ 2, 2, 2, 0 ]);
      });
    });

    describe("toMat3", function() {
      it("should work", function() {
        expect(quat4.toMat3([1,2,3,0])).toBeEqualish( [ -25, 4, 6, 4, -19, 12, 6, 12, -9 ] );
        var a = [];
        quat4.toMat3([1,2,3,0],  a);
        expect(a).toBeEqualish( [ -25, 4, 6, 4, -19, 12, 6, 12, -9 ] );
      });
    });

    describe("toMat4", function() {
      it("should work", function() {
        expect(quat4.toMat4([1,2,3,0])).toBeEqualish( [ -25, 4, 6, 0, 4, -19, 12, 0, 6, 12, -9, 0, 0, 0, 0, 1 ] );
        var a = [];
        quat4.toMat4([1,2,3,0],  a);
        expect(a).toBeEqualish( [ -25, 4, 6, 0, 4, -19, 12, 0, 6, 12, -9, 0, 0, 0, 0, 1 ] );
      });
    });
  });
  
  describe("fromRotationMatrix", function() {
    var mat;
    beforeEach(function() { mat = mat3.create([1, 0, 0, 0, 0, -1, 0, 1, 0]); });
    
    describe("with a dest quat4", function() {
      it("should return dest", function() {
        expect(quat4.fromRotationMatrix(mat, dest)).toBe(dest);
      });
      
      it("should set dest to the correct value", function() {
        quat4.fromRotationMatrix(mat, dest);
        expect(dest).toBeEqualish([0.707106, 0, 0, 0.707106]);
      });
      
      it("should not modify mat", function() {
        expect(mat).toBeEqualish([1, 0, 0, 0, 0, -1, 0, 1, 0]);
      });
    });
    
    describe("without a dest quat4", function() {
      it("should return a new quat4", function() {
        expect(quat4.fromRotationMatrix(mat)).toBeEqualish([0.707106, 0, 0, 0.707106]);
      });

      it("should not modify mat", function() {
        expect(mat).toBeEqualish([1, 0, 0, 0, 0, -1, 0, 1, 0]);
      });
    });
    
    it("should be aliased as mat3.toQuat4", function() {
      expect(mat3.toQuat4(mat)).toBeEqualish([0.707106, 0, 0, 0.707106]);
    });
  });
  
  describe("fromAxes", function() {
    var view, right, up, dest;
    beforeEach(function() {
      right = vec3.create([1,  0, 0]);
      up    = vec3.create([0,  0, 1]);
      view  = vec3.create([0, -1, 0]);
      dest  = quat4.create();
    });
    
    describe("with a dest quat4", function() {
      it("should not modify view", function() {
        quat4.fromAxes(view, right, up, dest);
        expect(view).toBeEqualish([0, -1, 0]);
      });

      it("should not modify up", function() {
        quat4.fromAxes(view, right, up, dest);
        expect(up).toBeEqualish([0, 0, 1]);
      });

      it("should not modify right", function() {
        quat4.fromAxes(view, right, up, dest);
        expect(right).toBeEqualish([1, 0, 0]);
      });
      
      it("should return dest", function() {
        expect(quat4.fromAxes(view, right, up, dest)).toBe(dest);
      });
      
      it("should set correct quat4 values", function() {
        quat4.fromAxes(view, right, up, dest);
        expect(dest).toBeEqualish([0.707106, 0, 0, 0.707106]);
      });
    });
    
    describe("without a dest quat4", function() {
      it("should not modify view", function() {
        quat4.fromAxes(view, right, up, dest);
        expect(view).toBeEqualish([0, -1, 0]);
      });

      it("should not modify up", function() {
        quat4.fromAxes(view, right, up, dest);
        expect(up).toBeEqualish([0, 0, 1]);
      });

      it("should not modify right", function() {
        quat4.fromAxes(view, right, up, dest);
        expect(right).toBeEqualish([1, 0, 0]);
      });
      
      it("should return correct quat4 values", function() {
        expect(quat4.fromAxes(view, right, up)).toBeEqualish([0.707106, 0, 0, 0.707106]);
      });
    });
  });
  
  describe("identity", function() {
    describe("with a dest quat4", function() {
      it("should return dest", function() {
        expect(quat4.identity(dest)).toBe(dest);
      });
      
      it("should set dest to identity", function() {
        quat4.identity(dest);
        expect(dest).toBeEqualish([0, 0, 0, 1]);
      });
    });
    
    describe("with no dest", function() {
      it("should return a new identity quat4", function() {
        expect(quat4.identity()).toBeEqualish([0, 0, 0, 1]);
      });
    });
  });
  
  describe("fromAngleAxis", function() {
    var axis, angle;
    
    beforeEach(function() {
      angle = 0.466;
      axis = vec3.create([0.627, 0, 0.778]);
    });
    
    describe("with a dest quat4", function() {
      it("should set the value of dest", function() {
        quat4.fromAngleAxis(angle, axis, dest);
        expect(dest).toBeEqualish([0.144772, 0, 0.179638, 0.972978]);
      });
      
      it("should return dest", function() {
        expect(quat4.fromAngleAxis(angle, axis, dest)).toBe(dest);
      });
      
      it("should not modify axis", function() {
        quat4.fromAngleAxis(angle, axis, dest);
        expect(axis).toBeEqualish([0.627, 0, 0.778]);
      });
    });
    
    describe("without a dest quat4", function() {
      it("should return the correct quat4", function() {
        expect(quat4.fromAngleAxis(angle, axis)).toBeEqualish([0.144772, 0, 0.179638, 0.972978]);
      });
      
      it("should not modify axis", function() {
        quat4.fromAngleAxis(angle, axis, dest);
        expect(axis).toBeEqualish([0.627, 0, 0.778]);
      });
    });
  });
  
  describe("toAngleAxis", function() {
    var quat;
    
    beforeEach(function() {
      quat = quat4.create([0.144772, 0, 0.179638, 0.972978]);
    });
    
    describe("with a dest vec4", function() {
      var dest;
      
      beforeEach(function() { dest = [0,0,0,0]; });
      
      it("should set the value of dest", function() {
        quat4.toAngleAxis(quat, dest);
        expect(dest).toBeEqualish([0.627490, 0, 0.778611, 0.466000]);
      });
      
      it("should return dest", function() {
        expect(quat4.toAngleAxis(quat, dest)).toBe(dest);
      });
      
      it("should not modify quat", function() {
        quat4.toAngleAxis(quat, dest);
        expect(quat).toBeEqualish([0.144772, 0, 0.179638, 0.972978]);
      });
    });
    
    describe("without a dest vec4", function() {
      it("should return the correct values", function() {
        expect(quat4.toAngleAxis(quat)).toBeEqualish([0.627490, 0, 0.778611, 0.466000]);
      });
      
      it("should modify quat", function() {
        quat4.toAngleAxis(quat);
        expect(quat).toBeEqualish([0.627490, 0, 0.778611, 0.466000]);
      });
    });
  });
});