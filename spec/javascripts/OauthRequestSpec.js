(function() {
  describe('OauthRequest Spec', function() {
    var oaInstance;
    oaInstance = sinon.stub();
    oaInstance.get = function() {
      return console.log("oaInstance : get : " + arguments);
    };
    oaInstance.setAccessTokens = sinon.stub();
    oaInstance.setAccessTokens.withArgs([]).throws('ArgError');
    window.OAuth = function() {
      return oaInstance;
    };
    return describe('initialization and url options', function() {
      it('sets the default oauth url configuration options', function() {
        var req;
        req = new OauthRequest('http://example.com', null, {});
        expect(req.urlConf.access_token).toBe('/access_token');
        return expect(req.urlConf.authorize).toBe('/authorize');
      });
      it('sets the root url', function() {
        var req;
        req = new OauthRequest('http://example.com', null, {});
        return expect(req.urlConf.root).toBe('http://example.com');
      });
      it('overrides url Config if option is supplied', function() {
        var req;
        req = new OauthRequest('http://example.com', {
          request_token: 'req',
          access_token: 'access',
          authorize: 'auth'
        }, {});
        return expect(req.urlConf.request_token).toBe('req');
      });
      return it('stores OAuth object instance', function() {
        var req;
        req = new Request('http://example.com', {}, {
          key: 'trolololo',
          secret: 'problem'
        });
        return expect(req.oauth).toBe(oaInstance);
      });
    });
  });
}).call(this);
