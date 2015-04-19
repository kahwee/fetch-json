'use strict';
if (!('fetch' in window)) {
	throw new Error('You need fetch API to work. Instructions are here: https://github.com/github/fetch');
}
module.exports = {
	get: require('./get'),
	post: require('./post')
};
