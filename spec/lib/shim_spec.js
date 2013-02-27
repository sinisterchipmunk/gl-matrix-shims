describe("shimming", function() {
  describe("noisily", function() {
    beforeEach(function() { GLMatrix.noisy = true; });
    afterEach(function() { GLMatrix.noisy = false; });

    it("should log to console", function() {
      spyOn(console, 'log');
      vec3.add([1,2,3], [3,2,1]);
      expect(console.log).toHaveBeenCalled();
    });
  });
});
