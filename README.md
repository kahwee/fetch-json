## fetch-json

Wrapper around fetch specific for JSON.

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
