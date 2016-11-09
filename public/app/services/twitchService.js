angular.module('twitchService', [])

.service('Twitch', function($http) {
  this.get = function(url) {
      return $http.get(url, {
        headers: {'Client-ID': 'huyy6nqq0rrp9jvgbplfw1rrgsosjxd'}
      });
    };
});