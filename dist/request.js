(function() {
  var Request;
  window.Request = Request = (function() {
    function Request(url, requestHeaders, auth) {
      this.url = url != null ? url : '';
      this.requestHeaders = requestHeaders != null ? requestHeaders : {};
      this.auth = auth != null ? auth : {};
    }
    Request.prototype.createFormData = function(object) {
      var data, name, value;
      data = new FormData();
      for (name in object) {
        value = object[name];
        data.append(name, value);
      }
      return data;
    };
    Request.prototype.httpRequest = function(method, path, data, callbacks) {
      var name, req, to_send, value, _ref;
      req = new XMLHttpRequest();
      req.open(method, this.url + path, true, this.auth.username, this.auth.password);
      _ref = this.requestHeaders;
      for (name in _ref) {
        value = _ref[name];
        req.setRequestHeader(name, value);
      }
      to_send = method === 'POST' ? this.createFormData(data) : null;
      req.send(to_send);
      return req.onreadystatechange = function(state) {
        if (req.readyState >= 4) {
          switch (req.status) {
            case 200:
            case 201:
            case 204:
              return callbacks.onSuccess(req);
            default:
              return callbacks.onFailure(req);
          }
        }
      };
    };
    Request.prototype.get = function(path, callbacks) {
      return this.httpRequest('GET', path, false, callbacks);
    };
    Request.prototype.post = function(path, data, callbacks) {
      return this.httpRequest('POST', path, data, callbacks);
    };
    Request.prototype.put = function(path, callbacks) {
      return this.httpRequest('PUT', path, false, callbacks);
    };
    Request.prototype["delete"] = function(path, callbacks) {
      return this.httpRequest('DELETE', path, false, callbacks);
    };
    return Request;
  })();
}).call(this);
