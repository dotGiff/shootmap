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
  
  function initialize(location, elementId) {
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
      zoomControl: true,
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
  getAddress = function(lat, lng){
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]){
          // console.log(results);
          return results;
        }
      }
    });
    return geocoder;
  }
  return {
    basicMap: function(location, elementId){
      initialize(location, elementId);
    },
    getAddress: function(lat, lng){
      // console.log(getAddress(lat, lng));
      return getAddress(lat, lng);
      // $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyD0BlA-zTIOA1mqGHquRwfodO34jFxTXrI").
      //   success(function(data, status, headers, config){
      //     console.log(data);
      //   });
    }
  }
}]);
