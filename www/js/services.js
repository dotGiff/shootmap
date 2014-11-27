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
      return initializeMap(location, elementId);
    },
    address: function(lat, lng){
      // console.log(getAddress(lat, lng));
      return getAddress(lat, lng);
      // $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyD0BlA-zTIOA1mqGHquRwfodO34jFxTXrI").
      //   success(function(data, status, headers, config){
      //     console.log(data);
      //   });
    }
  }
}]);
