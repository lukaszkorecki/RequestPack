describe 'OauthRequest Spec', ->
  url = 'http://example.com'
  urlconf = { request_token : 'req', access_token : 'access', authorize : 'auth' }
  consumer = { key : 'lol', secret : 'wat' }
  window.OAuth = () ->

  describe 'initialization and url options', ->
    it 'sets the default oauth url configuration options', ->
      req = new OauthRequest url, null, {}
      expect(req.urlConf.access_token).toBe '/access_token'
      expect(req.urlConf.authorize).toBe '/authorize'

    it 'sets the root url', ->
      req = new OauthRequest url, null, {}
      expect(req.urlConf.root).toBe url

    it 'overrides url Config if option is supplied', ->
      req = new OauthRequest url, urlconf, {}

      expect(req.urlConf.request_token).toBe 'req'

  it 'splits uqery stirng into a hash', ->
    expect( OauthRequest::secretAndToken('a=1&b=5').a).toBe '1'
    expect( OauthRequest::secretAndToken('a=1&b=5').b).toBe '5'

