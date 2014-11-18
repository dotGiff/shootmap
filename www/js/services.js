angular.module('shootmap.services', [])

.factory('Locations', ['$http', function($http) {
  var Locations = {};

  Locations.getLocations = function(){
    return $http.get('json/locations.json');
  };
  // console.dir(Locations);
  return Locations;
}]);
