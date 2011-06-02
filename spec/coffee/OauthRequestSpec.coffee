describe 'OauthRequest Spec', ->
  url = 'http://example.com'
  urlconf = { request_token : 'req', access_token : 'access', authorize : 'auth' }
  consumer = { key : 'lol', secret : 'wat' }

  window.OAuth = () ->
  orequest = new OauthRequest url, null, consumer

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


  describe 'OAuth dance', ->

    it 'sets the access_token', ->

      # fake request response
      requestData =
        text : 'some=data&you=know'

      # mock oauth object
      fakeOauth =
        get : (url, successCallback) ->
          expect(url).toMatch /example.com\/request_token/
          successCallback(requestData)
        openURL :(pin_url) ->
          expect(pin_url).toMatch /example.com/

      orequest.oauth = fakeOauth

      orequest.requestAuth(fakeOauth.openURL)
      expect(orequest.requestParams).toBe requestData.text
