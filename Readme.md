# Request pack

**Request pack** consists of two classes which make consuming REST
services really easy.

It's built for use with web runtimes such as [Titanium Desktop](http://appcelerator.com) or
Google Chrome Applications.


# Why not just use jQuery/Prototype/AwesomeFramework?

Because it's simple and just works. It also doesn't depend on any other
library (except [jsOAuth](https://github.com/bytespider/jsOAuth)).

# API

`RequestPack` consists of two classes, each using same interface, but
differing in the way authentication works:

- `Request` - is a wrapper around `XMLHttpRequest` and provides simple interface which is suitable for any sane API
- `OAuthRequest` - has the same API but uses jsOAuth as the core for
  making requests:

## Request

`Request` is easy to use and provides neat abstraction from regular
`XMLHttpRequest` stuff:

```coffeescript
req = new Req 'http://server.com/api', { accept : 'application/json'} , {username : 'lol', password : 'wat'}

req.get('/chunkybacon',
  onSuccess : (request) ->
    console.log(request.responseText)
  onFailure : (request) ->
    alert 'no bacon for you, lad'
)
```

...or in Javascript:

```javascript
var req = new Req('http://server.com/api', { accept : 'application/json'} , {username : 'lol', password : 'wat'})

req.get('/chunkybacon', {
  onSuccess : function(request) {
    console.log(request.responseText);
  },
  onFailure : function(request) {
    alert( 'no bacon for you, lad');
  }
});
```
