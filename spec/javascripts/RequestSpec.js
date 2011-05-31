(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  describe('Request Spec', function() {
    var request, server;
    request = new Request('http://example.com');
    server = sinon.fakeServer.create();
    server.respondWith('GET', 'http://example.com/test', [200, {}, 'hey']);
    server.respondWith('GET', 'http://example.com/test_fail', [401, {}, 'fail']);
    server.respondWith('POST', 'http://example.com/article', [201, {}, 'Created']);
    server.respondWith('DELETE', 'http://example.com/woop', [503, {}, '<p>FAIL</p>']);
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
    describe('with headers', function() {
      var headers_req;
      headers_req = new Request('', {
        test: 'ing'
      });
      return it('assigns request headers', function() {
        return expect(headers_req.requestHeaders.test).toBe('ing');
      });
    });
    return describe('request testing', function() {
      it('makes a get request to a working path', __bind(function() {
        request.get('/test', {
          onSuccess: function(req) {
            return expect(req.url).toBe('http://example.com/test');
          }
        });
        return server.respond();
      }, this));
      it('makes a get request and gets proper response', __bind(function() {
        request.get('/test', {
          onSuccess: function(req) {
            return expect(req.responseText).toBe('hey');
          }
        });
        return server.respond();
      }, this));
      it('makes a get request to a failing path', function() {
        request.get('/test_fail', {
          onFailure: function(req) {
            expect(req.url).toBe('http://example.com/test_fail');
            return expect(req.status).toBe(401);
          }
        });
        return server.respond();
      });
      it('gets body from a request from failing path', function() {
        request.get('/test_fail', {
          onFailure: function(req) {
            return expect(req.responseText).toBe('fail');
          }
        });
        return server.respond();
      });
      it('calls onFailure callback if path doesnt exist', function() {
        request.get('/lolol', {
          onFailure: function(req) {
            return expect(req.status).toBe(404);
          }
        });
        return server.respond();
      });
      it('POSTs data to a resource and fires a callback on success', function() {
        request.post('/article', {
          body: 'trolololo'
        }, {
          onSuccess: __bind(function(req) {
            expect(req.status).toBe(201);
            return expect(req.responseText).toBe('Created');
          }, this)
        });
        return server.respond();
      });
      it('calls onFailure on failing post', function() {
        request.post('/articles', {
          body: 'trolololo'
        }, {
          onFailure: __bind(function(req) {
            return expect(req.status).toBe(404);
          }, this)
        });
        return server.respond();
      });
      return it('recovers from 503 error after DELETE request', function() {
        request["delete"]('/woop', {
          onFailure: function(req) {
            expect(req.status).toBe(503);
            expect(req.responseText).toBe('<p>FAIL</p>');
            return expect(req.responseText).notToBe('fail');
          }
        });
        return server.respond();
      });
    });
  });
}).call(this);
