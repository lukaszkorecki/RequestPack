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
    describe('no auth', function() {
      return it('doesn\'t assign auth data and creates default params', function() {
        expect(request.auth.username).toBe(void 0);
        return expect(request.auth.password).toBe(void 0);
      });
    });
    describe('with auth', function() {
      var auth_request;
      auth_request = new Request('http://example.com', {}, {
        username: 'lol',
        password: 'wat'
      });
      return it('assigns auth data and creates default params', function() {
        expect(auth_request.auth.username).toBe('lol');
        return expect(auth_request.auth.password).toBe('wat');
      });
    });
    return describe('with headers', function() {
      var headers_req;
      headers_req = new Request('', {
        test: 'ing'
      });
      return it('assigns request headers', function() {
        return expect(headers_req.requestHeaders.test).toBe('ing');
      });
    });
  });
}).call(this);
