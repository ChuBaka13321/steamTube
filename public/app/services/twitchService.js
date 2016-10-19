angular.module('twitchService', [])

.factory('Twitch', function($http) {

  // create a new object
  var twitchFactory = {};

  // get a single twitch
  twitchFactory.get = function(url) {
    console.log(url, 'yooooo')
    return $http.get(url, {
      headers: {'Client-ID': 'huyy6nqq0rrp9jvgbplfw1rrgsosjxd'}
    });
  };

  // return our entire twitchFactory object
  return twitchFactory;

});