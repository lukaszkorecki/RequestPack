describe 'Request Spec', ->
  request = new Request 'http://example.com'

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
