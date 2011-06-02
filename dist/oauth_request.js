(function() {
  var OauthRequest;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.OauthRequest = OauthRequest = (function() {
    function OauthRequest(url, urlConf, consumer) {
      this.urlConf = urlConf != null ? urlConf : null;
      this.consumer = consumer;
      this.requestParams = '';
      if (this.urlConf == null) {
        this.urlConf = {
          request_token: '/request_token',
          access_token: '/access_token',
          authorize: '/authorize'
        };
      }
      this.urlConf.root = url;
      this.oauth = OAuth(this.consumer);
    }
    OauthRequest.prototype.setAccessTokens = function(oauthToken, oauthTokenSecret) {
      return this.oauth.setAccessToken([oauthToken, oauthTokenSecret]);
    };
    OauthRequest.prototype.secretAndToken = function(string) {
      var pair, res;
      res = {};
      pair = [];
      string.split('&').forEach(function(data) {
        pair = data.split('=');
        return res[pair[0]] = res[pair[1]];
      });
      return res;
    };
    OauthRequest.prototype.requestAuth = function(openURLFunction) {
      var failure, request_url;
      failure = function(data) {
        console.log('FAILED');
        return console.dir(data);
      };
      request_url = this.urlConf.root + this.urlConf.request_token;
      return this.oauth.get(request_url, (__bind(function(data) {
        if (data && data.text) {
          openURLFunction(this.urlConf.root + this.urlConf.authorize + '?' + data.text);
          return this.requestParams = data.text;
        } else {
          return failure(data);
        }
      }, this)), fail);
    };
    OauthRequest.prototype.userAuthorize = function(pin, callbacks) {
      var failure, url;
      failure = function(data) {
        console.log('ERROR');
        console.dir(data);
        return callbacks.onFailure(data);
      };
      url = "" + this.urlConf.root + this.urlConf.access_token + "?oauth_verifier=" + pin + "&" + this.requestParams;
      return this.oauth.get(url, (__bind(function(data) {
        var auth;
        auth = this.secretAndToken(data.text);
        this.setAccessTokens(auth.oauth_token, auth.oauth_token_secret);
        return callbacks.onSuccess(auth);
      }, this)), failure);
    };
    OauthRequest.prototype.get = function(path, callbacks) {
      return this.oauth.get(this.urlConf.root + path, callbacks.onSuccess, callbacks.onFailure);
    };
    OauthRequest.prototype.post = function(path, data, callbacks) {
      return this.oauth.get(this.urlConf.root + path, data, callbacks.onSuccess, callbacks.onFailure);
    };
    OauthRequest.prototype["delete"] = function(path, callbacks) {
      var url;
      url = this.urlConf.root + path;
      return this.oauth.request({
        method: 'DELETE',
        url: url,
        success: callbacks.onSuccess,
        failure: callbacks.onFailure
      });
    };
    OauthRequest.prototype.put = function(path, callbacks) {
      var url;
      url = this.urlConf.root + path;
      return this.oauth.request({
        method: 'PUT',
        url: url,
        success: callbacks.onSuccess,
        failure: callbacks.onFailure
      });
    };
    return OauthRequest;
  })();
}).call(this);
