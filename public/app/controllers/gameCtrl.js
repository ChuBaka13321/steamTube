angular.module('gameCtrl', ['gameService', 'youtube-embed', 'twitchService', 'steamService'])

.controller('gameController', function($scope, $location, Game, $routeParams, $timeout, $sce, Twitch, Steam) {
  Game.get($routeParams.id)
    .success(function(data) {
      // $scope.image = data.image
      $scope.name = data.name
      $scope.price = data.price
      $scope.link = data.link
      $scope.largeImage = data.largeImage
      console.log(data)
      // $scope.twitch = $sce.trustAsResourceUrl("http://www.youtube.com/embed");
      
      Twitch.get('https://api.twitch.tv/kraken/streams?game=' + data.name)
        .success(function(stream){
          // console.log("MATTHIEU ", stream)
          // var blah = "http://www.twitch.tv/summit1g/embed"
          if(stream["streams"][0]) {
            var channel = stream["streams"][0]["channel"]["url"] + "/embed";
          } else {
            var channel = "http://placehold.it/485x390/ffffff/?text=No Streams"
          }
          console.log("Channel", channel)
          $scope.twitch = $sce.trustAsResourceUrl(channel);
          // $scope.twitch = "http://www.youtube.com/embed/XGSy3_Czz8k";
        })
      onClientLoad()
    })

    

  function showResponse(response) {
      var responseString = JSON.stringify(response, '', 2);
      // document.getElementById('response').innerHTML += responseString;
      // console.log("RESPONSE STRING" +responseString)
      // $scope.blank = JSON.parse(responseString).items[0].id.videoId;
      console.log("ANDREW", JSON.parse(responseString).items[0].id.videoId)
      $scope.video1 = JSON.parse(responseString).items[0].id.videoId || JSON.parse(responseString).items[1].id.videoId;
      // $scope.video2 = JSON.parse(responseString).items[1].id.videoId;
      // $scope.video3 = JSON.parse(responseString).items[2].id.videoId;
      console.log(JSON.parse(responseString).items);
      // var streams = JSON.parse(get_url_contents("https://api.twitch.tv/kraken/streams?game=Counter-Strike: Global Offensive"));
      // console.log("MATTHIEU ", streams)
      $scope.$apply()
      

  }

  // Called automatically when JavaScript client library is loaded.
  function onClientLoad() {
      gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
      // $scope.blank = "dood";
      // console.log($scope.blank)
  }
  // console.log("HEYYY", gapi.client.load('youtube', 'v3', onYouTubeApiLoad))

  // Called automatically when YouTube API interface is loaded (see line 9).
  function onYouTubeApiLoad() {
      // This API key is intended for use only in this lesson.
      // See https://goo.gl/PdPA1 to get a key for your own applications.
      gapi.client.setApiKey('AIzaSyCzMMTskQ7-gRIi0BMYoO2rU1o2vVw7OrQ');

      search();
  }

  function search() {
      // Use the JavaScript client library to create a search.list() API call.
      var request = gapi.client.youtube.search.list({
          part: 'snippet',
          q: "Let's play " + $scope.name
      });
      console.log("$SCOPE.NAME === ", $scope.name);
      // Send the request to the API server,
      // and invoke onSearchRepsonse() with the response.
      request.execute(onSearchResponse);
  }

  // Called automatically with the response of the YouTube API request.
  function onSearchResponse(response) {
      showResponse(response);
  }
  // $timeout(function(){onClientLoad()}, 100);

})

