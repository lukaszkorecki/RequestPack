describe 'OauthRequest Spec', ->
  oaInstance = sinon.stub()
  oaInstance.get   = () -> console.log "oaInstance : get : #{arguments}"
  oaInstance.setAccessTokens = sinon.stub()
  oaInstance.setAccessTokens.withArgs([]).throws 'ArgError'

  window.OAuth = () -> oaInstance

  describe 'initialization and url options', ->
    it 'sets the default oauth url configuration options', ->
      req = new OauthRequest 'http://example.com', null, {}
      expect(req.urlConf.access_token).toBe '/access_token'
      expect(req.urlConf.authorize).toBe '/authorize'

    it 'sets the root url', ->
      req = new OauthRequest 'http://example.com', null, {}
      expect(req.urlConf.root).toBe 'http://example.com'

    it 'overrides url Config if option is supplied', ->
      req = new OauthRequest 'http://example.com', {
        request_token : 'req',
        access_token : 'access',
        authorize : 'auth'
      }, {}

      expect(req.urlConf.request_token).toBe 'req'
