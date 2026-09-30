# fetch-json

Small CommonJS helpers for fetching JSON and posting JSON bodies through the
browser Fetch API.

## Install

```sh
npm install fetch-json
```

## Use

```js
const getJSON = require('fetch-json/get')
const postJSON = require('fetch-json/post')

getJSON('/api/profile').then(profile => console.log(profile))
postJSON('/api/login', { body: { username: 'demo', password: 'example' } })
  .then(response => response.json())
  .then(data => console.log(data))
```

`get` parses the response as JSON. `post` serializes non-string bodies and
sets POST/JSON headers, but returns the Fetch `Response`; call `.json()`
explicitly. Neither helper rejects a response solely for an HTTP error status.

The root export is `{ get, post }` and expects `window.fetch`. Use a browser
bundle or a compatible environment. There is no implemented test suite:
`npm test` is a failing placeholder. See [get.js](get.js) and [post.js](post.js).
