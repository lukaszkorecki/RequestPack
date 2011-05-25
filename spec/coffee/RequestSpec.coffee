describe 'Request Spec', ->
  request = new Request 'http://example.com'

  it 'creates an instance of Request', ->
    expect(request).toBeDefined()
  it 'assigns root url', ->
    expect(request.url).toBe('http://example.com')

  it 'doesnt assign auth data and creates default params', ->
    expect(request.auth.username).toBe(undefined)
    expect(request.auth.password).toBe(undefined)
