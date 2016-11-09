angular.module('gameService', [])
.service('Game', function($http) {
  // var gameFactory = {};

  // get a single game
  this.get = function(id) {
    return $http.get('/api/games/' + id);
  };

  // get all games
  this.all = function() {
    return $http.get('/api/games/');
  };
})