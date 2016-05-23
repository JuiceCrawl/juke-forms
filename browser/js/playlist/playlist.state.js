'use strict';

juke.config(function($stateProvider){
  $stateProvider.state('newPlaylist',{
    url: '/newPlaylist',
    templateUrl: 'js/playlist/templates/newPlaylist.html',
    controller: 'playlist'
  });
});

juke.config(function($stateProvider){
  $stateProvider.state('playlist',{
    url: '/playlist/:id',
    templateUrl: 'js/playlist/templates/playlist.html',
    controller: 'oneplaylist', 
    resolve: {
      thePlaylist: function (PlaylistFactory, $stateParams){
          return PlaylistFactory.getById($stateParams.id);
      },
      theSongs: function(SongFactory){
        return SongFactory.getAllSongs();
      }
    }
  });
});