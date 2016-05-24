juke.factory('PlaylistFactory', function($http){
  
  var cachedPlaylists = [];
  var PlaylistFactory = {};
  // console.log(cachedPlaylists);
  
  PlaylistFactory.getById = function (id) {
    return $http.get("/api/playlists/"+id)
    .then(function(response){
      console.log("hi");
      return response.data;
    });
  };

  PlaylistFactory.getAll = function() {
    return $http.get('/api/playlists')
    .then(function(response){
      angular.copy(response.data, cachedPlaylists);
      return cachedPlaylists;
    }).then(null, function(err){
      console.log(err);
      return err;
    });
  };

  PlaylistFactory.create = function(title){
    return $http.post('api/playlists/', {name:title})
    .then(function(response){
      var playlist = response.data;
      cachedPlaylists.push(playlist);
      return playlist;
    })
    .then(null, function(err){
      console.error(err);
      return err;
    });

  };

 

  return PlaylistFactory;
});