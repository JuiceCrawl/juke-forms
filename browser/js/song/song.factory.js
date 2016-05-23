'use strict';

juke.factory('SongFactory', function ($http) {



  function convert (song) {
    song.audioUrl = '/api/songs/' + song.id + '/audio';
    return song;
  }

  function getAllSongs(){
    return $http.get('api/songs')
    .then(function(songs){
      return songs.data;
    })
    .then(null,function(err){
      console.error(err);    
    });
  }



  function addToPlaylist (playlistid, song) {
      return $http.post('api/playlists/'+playlistid+'/songs/',
       {song: song})
      .then(function(response){
        return response.data;
      });
  };


  return {
    convert: convert,
    getAllSongs : getAllSongs,
    addToPlaylist : addToPlaylist
  };

});
