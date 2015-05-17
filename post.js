var assign = require('object-assign');
var defaults = {
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};
module.exports = function(url, obj) {
  var newObj = assign({}, obj, defaults);
  if (typeof newObj.body !== 'string') {
    newObj.body = JSON.stringify(newObj.body);
  }
  return fetch(url, newObj);
};
