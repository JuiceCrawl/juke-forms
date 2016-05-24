juke.controller('playlist', function($scope, $state, PlaylistFactory){
  // $scope.create = PlaylistFactory.create;
  $scope.title;

  $scope.create = function(title) {
    PlaylistFactory.create(title)
    .then(function(created){
      console.log("we created this:", created);
      $scope.title = $scope.name;
      $scope.name = null;
      return created;
    })
    .then(function(created){
      $state.go('playlist', {id: created.id});
    });
  };
 
});

juke.controller('oneplaylist', function($scope, thePlaylist, theSongs, PlayerFactory, SongFactory){
    
    $scope.playlist = thePlaylist;
    $scope.songs = theSongs;
    $scope.add = function(playlistid, song){ 
      SongFactory.addToPlaylist(playlistid, song)
      .then(function(song) {
        console.log("SONG", song);
         $scope.playlist.songs.push(song);
      })
      .then(function() {
        $scope.selected = false;
      });
    };

  $scope.remove = function(playlistid, song){ 
      console.log("dont question the hi");
      SongFactory.removeFromPlaylist(playlistid, song)
      .then(function(songObj) {
         var index = $scope.playlist.songs.indexOf(songObj);
         $scope.playlist.songs.splice(index, 1);
         console.log('songObj',songObj);
      });
  };

  $scope.toggle = function (song) {
      console.log("here", song)
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };





});