describe("mat4", function() {
  var result, a, b, dest;
  
  describe("backtested", function() {
    // these methods weren't tested in 1.x

    describe("createFrom", function() {
      it("should work", function() {
        expect(mat4.createFrom(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16)).toBeEqualish([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
      });
    });

    describe("toRotationMat", function() {
      it("should work", function() {
        expect(mat4.toRotationMat([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])).toBeEqualish([1,2,3,0,5,6,7,0,9,10,11,0,0,0,0,1]);
        var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        var out = [];
        mat4.toRotationMat(a, out);
        expect(out).toBeEqualish([1,2,3,0,5,6,7,0,9,10,11,0,0,0,0,1]);
      });
    });

    describe("toMat3", function() {
      it("should work", function() {
        expect(mat4.toMat3([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])).toBeEqualish([1,2,3,5,6,7,9,10,11]);
        var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
        var out = [];
        mat4.toMat3(a, out);
        expect(out).toBeEqualish([1,2,3,5,6,7,9,10,11]);
      });
    });

    describe("toInverseMat3", function() {
      it("should work", function() {
        var expectation = mat3.inverse([1,0,0,0,0,-1,0,1,0], mat3.identity(mat3.create()));

        expect(mat4.toInverseMat3([1,0,0,1,0,0,-1,2,0,1,0,3,0,0,0,1])).toBeEqualish(expectation);
        var a = [1,0,0,1,0,0,-1,2,0,1,0,3,0,0,0,1];
        var out = [];
        mat4.toInverseMat3(a, out);
        expect(out).toBeEqualish(expectation);
      });
    });

    describe("translate", function() {
      it("should work", function() {
        var expectation = [1,0,0,0,0,0,-1,0,0,1,0,0,1,3,-2, 1];

        expect(mat4.translate([1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1], [1,2,3], [])).toBeEqualish(expectation);
        var a = [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1];
        mat4.translate(a, [1,2,3]);
        expect(a).toBeEqualish(expectation);
      });
    });

    describe("rotate", function() {
      it("should work", function() {
        var expectation = [ 0.573137855448987, -0.35127851212351696, -0.740348840460782, 0, -0.6090066421373933, 0.4219058779181122, -0.6716445041915284, 0, 0.5482918096085999, 0.8358222520957642, 0.027879282947946255, 0, 0, 0, 0, 1 ];

        expect(mat4.rotate([1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1], 1, [1,2,3], [])).toBeEqualish(expectation);
        var a = [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1];
        mat4.rotate(a, 1, [1,2,3]);
        expect(a).toBeEqualish(expectation);
      });
    });

    describe("rotateX", function() {
      it("should work", function() {
        var expectation = [ 1, 0, 0, 0, 0, 0.8414709848078965, -0.5403023058681398, 0, 0, 0.5403023058681398, 0.8414709848078965, 0, 0, 0, 0, 1 ];

        expect(mat4.rotateX([1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1], 1, [])).toBeEqualish(expectation);
        var a = [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1];
        mat4.rotateX(a, 1);
        expect(a).toBeEqualish(expectation);
      });
    });

    describe("rotateY", function() {
      it("should work", function() {
        var expectation = [ 0.5403023058681398, -0.8414709848078965, 0, 0, 0, 0, -1, 0, 0.8414709848078965, 0.5403023058681398, 0, 0, 0, 0, 0, 1 ];

        expect(mat4.rotateY([1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1], 1, [])).toBeEqualish(expectation);
        var a = [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1];
        mat4.rotateY(a, 1);
        expect(a).toBeEqualish(expectation);
      });
    });

    describe("rotateZ", function() {
      it("should work", function() {
        var expectation = [ 0.5403023058681398, 0, -0.8414709848078965, 0, -0.8414709848078965, 0, -0.5403023058681398, 0, 0, 1, 0, 0, 0, 0, 0, 1 ];

        expect(mat4.rotateZ([1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1], 1, [])).toBeEqualish(expectation);
        var a = [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1];
        mat4.rotateZ(a, 1);
        expect(a).toBeEqualish(expectation);
      });
    });

    describe("frustum", function() {
      it("should work", function() {
        var expectation = [ 10, 0, 0, 0, 0, 10, 0, 0, 3, 7, -11, -1, 0, 0, -60, 0 ];

        expect(mat4.frustum(1, 2, 3, 4, 5, 6)).toBeEqualish(expectation);
        var a = [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1];
        mat4.frustum(1, 2, 3, 4, 5, 6, a);
        expect(a).toBeEqualish(expectation);
      });
    });

    describe("ortho", function() {
      it("should work", function() {
        var expectation = [ 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, -2, 0, -3, -7, -11, 1 ];

        expect(mat4.ortho(1, 2, 3, 4, 5, 6)).toBeEqualish(expectation);
        var a = [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1];
        mat4.ortho(1, 2, 3, 4, 5, 6, a);
        expect(a).toBeEqualish(expectation);
      });
    });

    describe("lookAt", function() {
      it("should work", function() {
        var expectation = [ -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1 ];

        expect(mat4.lookAt([0,0,0], [0,0,1], [0,1,0])).toBeEqualish(expectation);
        var a = [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1];
        mat4.lookAt([0,0,0], [0,0,1], [0,1,0], a);
        expect(a).toBeEqualish(expectation);
      });
    });

    describe("str", function() {
      it("should work", function() {
        expect(mat4.str([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])).toBeEqualish('[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]');
      });
    });

    describe("fromRotationTranslation", function() {
      it("should work", function() {
        var expectation = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1 ];

        expect(mat4.fromRotationTranslation([0,0,0,1], [0,0,1])).toBeEqualish(expectation);
        var a = [1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1];
        mat4.fromRotationTranslation([0,0,0,1], [0,0,1], a);
        expect(a).toBeEqualish(expectation);
      });
    });

    describe("equal", function() {
      it("should work", function() {
        expect(mat4.equal([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                          [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])).toBeTruthy();
        expect(mat4.equal([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
                          [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17])).toBeFalsy();
      });
    });

    describe("with nonzero near, 45deg fovy, and realistic aspect ratio", function() {
      beforeEach(function() { result = mat4.perspective(45, 640/480, 0.1, 200, mat4.create()); });
      it("should calculate correct matrix", function() { expect(result).toBeEqualish([
          1.81066, 0, 0, 0,
          0, 2.414213, 0, 0,
          0, 0, -1.001, -1,
          0, 0, -0.2001, 0
      ]); });
    });
  });

  beforeEach(function() {
    a = mat4.identity(mat4.create());
  });
  
  describe("multiply", function() {
    it("an identity with itself should produce an identity", function() {
      expect(mat4.multiply(a, a, dest)).toBeEqualish([1,0,0,0,  0,1,0,0,  0,0,1,0,  0,0,0,1]);
    });
  });
});
