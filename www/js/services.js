angular.module('shootmap.services', [])

.factory('Locations', ['$http', function($http) {
  var Locations = {};

  Locations.getLocations = function(){
    return $http.get('json/locations.json');
  };
  // console.dir(Locations);
  return Locations;
}])

.service('myMap', [ function() {
  initializeMap = function(location, elementId){
    var myLatlng = new google.maps.LatLng(location.coordinates.latitude, location.coordinates.longitude);
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById(elementId),
        mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: location.name
    });

    return map;
  }
  return {initializeMap: initializeMap}; 
}]);
