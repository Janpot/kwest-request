'use strict';

var Promise  = require('bluebird'),
    _request = require('request'),
    caseless = require('caseless'),
    base     = require('kwest-base'),
    kwest    = require('kwest');

var jar    = _request.jar.bind(_request),
    cookie = _request.cookie.bind(_request);

var promisifiedRequest = Promise.promisify(_request);

var makeRequest = function (request) {
  return promisifiedRequest(request)
    .spread(function (response) {
      caseless.httpify(response, response.headers);
      return response;
    });
};

function init() {
  return kwest(null, base(makeRequest));
}

init.jar    = jar;
init.cookie = cookie;

module.exports = init;
