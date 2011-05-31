window.Campfire = class Campfire
  constructor: (api_key, host) ->
    @url = "https://#{host}.campfirenow.com/"
    @auth = { 'username' : api_key, 'password' : 'X'}
    @headers = { 'Content-Type' : 'application/json' }

  handlers: (callbacks) ->
    resp =
      onSuccess : (response) ->
        try
          obj = JSON.parse(response.responseText)
        catch error
          console.dir(error)
          callbacks.onFailure(error)
        callbacks.onSuccess(obj)

      onFailure: (response) ->
        console.dir(response)
        callbacks.onFailure(response)

  rooms: (callbacks) ->
    new Request(@url, @headers, @auth).get 'rooms.json', this.handlers(callbacks)

  roomInfo: (id, callbacks) ->
    new Request(@url, @headers, @auth).get "room/#{id}.json", this.handlers(callbacks)

  recent: (id, since, callbacks) ->
    url = "room/#{id}/recent.json"
    url += "?since_message_id=#{since}" if since
    new Request(@url, @headers, @auth).get url, this.handlers(callbacks)

