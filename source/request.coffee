window.Request = class Request
  constructor: (@url = '', @requestHeaders={}, @auth = {}) ->

  createFormData: (object) ->
    data = new FormData()
    for name, value of object
      data.append name, value

    data

  httpRequest: (method, path, data, callbacks) ->
    req = new XMLHttpRequest()

    req.open method, @url+path, true, @auth.username, @auth.password

    for name, value of @requestHeaders
      req.setRequestHeader name, value

    to_send = if method is 'POST' then this.createFormData(data) else null

    req.send to_send

    req.onreadystatechange = (state) ->
      if req.readyState >= 4
        switch req.status
          when 200, 201, 204
            callbacks.onSuccess req
          else
            callbacks.onFailure req


  get: (path, callbacks) -> this.httpRequest 'GET', path, false, callbacks
  post: (path, data, callbacks) -> this.httpRequest 'POST', path, data, callbacks
  put: (path, callbacks) -> this.httpRequest 'PUT', path, false, callbacks
  delete: (path, callbacks) -> this.httpRequest 'DELETE', path, false, callbacks
