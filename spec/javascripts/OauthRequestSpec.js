(function() {
  describe('OauthRequest Spec', function() {
    var consumer, orequest, url, urlconf;
    url = 'http://example.com';
    urlconf = {
      request_token: 'req',
      access_token: 'access',
      authorize: 'auth'
    };
    consumer = {
      key: 'lol',
      secret: 'wat'
    };
    window.OAuth = function() {};
    orequest = new OauthRequest(url, null, consumer);
    describe('initialization and url options', function() {
      it('sets the default oauth url configuration options', function() {
        var req;
        req = new OauthRequest(url, null, {});
        expect(req.urlConf.access_token).toBe('/access_token');
        return expect(req.urlConf.authorize).toBe('/authorize');
      });
      it('sets the root url', function() {
        var req;
        req = new OauthRequest(url, null, {});
        return expect(req.urlConf.root).toBe(url);
      });
      return it('overrides url Config if option is supplied', function() {
        var req;
        req = new OauthRequest(url, urlconf, {});
        return expect(req.urlConf.request_token).toBe('req');
      });
    });
    it('splits uqery stirng into a hash', function() {
      expect(OauthRequest.prototype.secretAndToken('a=1&b=5').a).toBe('1');
      return expect(OauthRequest.prototype.secretAndToken('a=1&b=5').b).toBe('5');
    });
    return describe('OAuth dance', function() {
      return it('sets the access_token', function() {
        var fakeOauth, requestData;
        requestData = {
          text: 'some=data&you=know'
        };
        fakeOauth = {
          get: function(url, successCallback) {
            expect(url).toMatch(/example.com\/request_token/);
            return successCallback(requestData);
          },
          openURL: function(pin_url) {
            return expect(pin_url).toMatch(/example.com/);
          }
        };
        orequest.oauth = fakeOauth;
        orequest.requestAuth(fakeOauth.openURL);
        return expect(orequest.requestParams).toBe(requestData.text);
      });
    });
  });
}).call(this);
