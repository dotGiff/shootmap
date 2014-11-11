angular.module('shootmap.services', [])

.factory('Locations', function($http) {
  var data = [];

  var getLocations = function(){
      $http.get('json/locations.json').success(function(data){
        // console.log(data);
        return data;
      });
  };

  var setLocations = function(){

  };

  return {
    all: function() {
      console.log(getLocations());
      return getLocations();
    },
    get: function(locationId) {
      // Simple index lookup
      getLocations();
      return locations[locationId];
    },
    set: function(location){
      getLocations();
      locations.push(location);
      setTextbooks();
      return locations;
    }
  };
});
