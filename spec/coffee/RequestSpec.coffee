describe 'Request Spec', ->
  request = new Request 'http://example.com'
  server = sinon.fakeServer.create()
  server.respondWith 'GET', 'http://example.com/test', [ 200 , {}, 'hey']
  server.respondWith 'GET', 'http://example.com/test_fail', [ 401, {}, 'fail']


  it 'creates an instance of Request', ->
    expect(request).toBeDefined()

  it 'assigns root url', ->
    expect(request.url).toBe 'http://example.com'

  describe 'no auth', ->
    it 'doesn\'t assign auth data and creates default params', ->
      expect(request.auth.username).toBe undefined
      expect(request.auth.password).toBe undefined
  describe 'with auth', ->
    auth_request = new Request 'http://example.com', {}, { username : 'lol', password : 'wat'}
    it 'assigns auth data and creates default params', ->
      expect(auth_request.auth.username).toBe 'lol'
      expect(auth_request.auth.password).toBe 'wat'
  describe 'with headers', ->
    headers_req = new Request '', { test : 'ing'}
    it 'assigns request headers', ->
      expect(headers_req.requestHeaders.test).toBe 'ing'

  describe 'request testing', ->
    it 'makes a get request to a working path', =>
      request.get('/test', {
          onSuccess : (req) ->
            expect(req.url).toBe 'http://example.com/test'
      })
      server.respond()

    it 'makes a get request and gets proper response', =>
      request.get('/test', {
          onSuccess : (req) ->
            expect(req.responseText).toBe 'hey'
      })
      server.respond()

    it 'makes a get request to a failing path', ->
      request.get('/test_fail', {
          onFailure : (req) ->
            expect(req.url).toBe 'http://example.com/test_fail'
            expect(req.status).toBe 401
        })
      server.respond()

    it 'gets body from a request from failing path', ->
      request.get('/test_fail', {
          onFailure : (req) ->
            expect(req.responseText).toBe 'fail'
        })
      server.respond()

    it 'calls onFailure callback if path doesnt exist', ->
      request.get('/lolol',{
        onFailure : (req) ->
          expect(req.status).toBe 404
      })
