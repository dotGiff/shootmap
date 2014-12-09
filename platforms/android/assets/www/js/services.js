angular.module('shootmap.services', [])

.factory('Locations', ['$http', function($http) {
  var Locations = {};

  Locations.getLocations = function(){
    return $http.get('json/locations.json');
  };
  // console.dir(Locations);
  return Locations;
}])

.service('myMap', ['$http', function($http) {
  
  initialize = function(location, elementId) {
    var myLatlng = new google.maps.LatLng(location.coordinates.latitude, location.coordinates.longitude);
    var mapOptions = {
      zoom: 16,                                               
      minZoom: 7,  
      center: myLatlng,
      mapTypeControl: true,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      panControl: false,
      zoomControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.TOP_LEFT
      },
      scaleControl: true,
      streetViewControl: false
    }
    var map = new google.maps.Map(document.getElementById(elementId), mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: location.name
    });
  }
  return {
    basicMap: function(location, elementId){
      initialize(location, elementId);
    }
  }
}]);
