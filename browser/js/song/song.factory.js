'use strict';

juke.factory('SongFactory', function ($http) {



  function convert (song) {
    song.audioUrl = '/api/songs/' + song.id + '/audio';
    return song;
  }

  function getAllSongs(){
    return $http.get('api/songs')
    .then(function(songs){
      songs = songs.data.map(function(song){
        return convert(song);
      });
      return songs;
    })
    .then(null,function(err){
      console.error(err);    
    });
  }



  function addToPlaylist (playlistid, song) {
      return $http.post('api/playlists/'+playlistid+'/songs/',
       {song: song})
      .then(function(response){
        var song = response.data
        convert(song);
        return song;
      });
  };

  function removeFromPlaylist (playlistid, song){
    console.log("song", song)
    var songId = song.id
    return $http.delete('api/playlists/'+playlistid+'/songs/'+songId)
    .then(function(deletedsong){
      console.log("delted", deletedsong, song);
      return(song);
    });
  }
  return {
    convert: convert,
    getAllSongs : getAllSongs,
    addToPlaylist : addToPlaylist,
    removeFromPlaylist: removeFromPlaylist
  };

});
