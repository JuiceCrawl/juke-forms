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

juke.controller('oneplaylist', function($scope, thePlaylist, theSongs, SongFactory){
    
    $scope.playlist = thePlaylist;
    $scope.songs = theSongs;
    $scope.add = function(playlistid, song){ 
      SongFactory.addToPlaylist(playlistid, song)
      .then(function(songs) {
         $scope.playlist.songs.push(songs);
      })
      .then(function() {
        $scope.selected = false;
      });
    };





});