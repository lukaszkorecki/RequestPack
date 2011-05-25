(function() {
  describe('Request Spec', function() {
    var request;
    request = new Request('http://example.com');
    it('creates an instance of Request', function() {
      return expect(request).toBeDefined();
    });
    it('assigns root url', function() {
      return expect(request.url).toBe('http://example.com');
    });
    return it('doesnt assign auth data and creates default params', function() {
      expect(request.auth.username).toBe(void 0);
      return expect(request.auth.password).toBe(void 0);
    });
  });
}).call(this);
