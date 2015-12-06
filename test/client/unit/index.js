describe('sample', function () {
  before(function () {
    if (window.__html__) {
      document.body.innerHTML = window.__html__['test/index.html'];
    }
  });

  it('should be registered as the global `KineticType`', function () {
    expect(window.KineticType).to.be.a('function');
  });
});
