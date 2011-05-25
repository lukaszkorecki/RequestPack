(function() {
  describe('Request Spec', function() {
    var request;
    request = new Request('http://example.com');
    return it('creates an instance of Request', function() {
      return expect(request).toBeDefined();
    });
  });
}).call(this);
