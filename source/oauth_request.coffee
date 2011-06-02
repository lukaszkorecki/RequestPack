window.OauthRequest = class OauthRequest
  constructor: (url, @urlConf = null, @consumer) ->

    @requestParams = ''
    @urlConf = {
      request_token : '/request_token',
      access_token : '/access_token',
      authorize : '/authorize' } unless @urlConf?

    @urlConf.root = url

    @oauth = OAuth(@consumer)

  setAccessTokens : (oauthToken, oauthTokenSecret) ->
    @oauth.setAccessToken [oauthToken, oauthTokenSecret]

  secretAndToken : (string) ->
    res = {}
    pair = []
    string.split('&').forEach (data) ->
      pair = data.split '='
      res[pair[0]] = res[pair[1]]

    res

  requestAuth : (openURLFunction) ->
    failure = (data) ->
      console.log('FAILED')
      console.dir(data)
    request_url = @urlConf.root + @urlConf.request_token

    @oauth.get(request_url, ((data) =>
      if data and data.text
        openURLFunction @urlConf.root+@urlConf.authorize+'?'+data.text
        @requestParams = data.text
      else
        failure(data)
    ), fail)


  userAuthorize : (pin, callbacks) ->
    failure = (data) ->
      console.log 'ERROR'
      console.dir data
      callbacks.onFailure data

    url = "#{@urlConf.root}#{@urlConf.access_token}?oauth_verifier=#{pin}&#{@requestParams}"
    @oauth.get(url,(
      (data) =>
        auth = @secretAndToken(data.text)
        @setAccessTokens auth.oauth_token, auth.oauth_token_secret
        callbacks.onSuccess auth
    ), failure)

  get : (path, callbacks) -> @oauth.get @urlConf.root+path, callbacks.onSuccess, callbacks.onFailure
  post : (path, data, callbacks) -> @oauth.get @urlConf.root+path, data, callbacks.onSuccess, callbacks.onFailure
  delete : (path, callbacks) ->
    url = @urlConf.root + path
    @oauth.request {
      method : 'DELETE',
      url : url,
      success : callbacks.onSuccess,
      failure : callbacks.onFailure
    }
  put : (path, callbacks) ->
    url = @urlConf.root + path
    @oauth.request {
      method : 'PUT',
      url : url,
      success : callbacks.onSuccess,
      failure : callbacks.onFailure
    }
