describe 'Request Spec', () ->
  request = new Request 'http://example.com'

  it 'creates an instance of Request', () ->
    expect(request).toBeDefined()
