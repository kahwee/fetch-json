## fetch-json

Wrapper around fetch specific for JSON.

## `fetch-json/post`

This function use Fetch API and adds in the relevant JSON headers for you:

```  
method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
```

## Example usage

```js
var postJSON = require('fetch-json/post');
postJSON('/api/login', {
  body: {
    username: 'kahwee',
    password: '!password1'
  }
}).then(function(data) {
  console.log(data, 'done');
});
```
