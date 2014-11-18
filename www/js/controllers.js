angular.module('shootmap.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ListCtrl', ['$scope', '$http', 'Locations', function($scope, $http, Locations) {
  $scope.locations;
  getLocations();

  function getLocations(){
    Locations.getLocations()
      .success(function(loc){
        $scope.locations = loc;
      }).
      error(function(error){
        $scope.locations = 'whoops, something went wrong: ' + error.message;
      });
  }
}])

.controller('LocationsCtrl', function($scope, $stateParams, $http, $ionicLoading, $compile, Locations) {
  $http.get('json/locations.json').success(function(data){
    loc = data;
    // var loc = data;
    function initializeMap(location) {
      var myLatlng = new google.maps.LatLng(location.coordinates.latitude, location.coordinates.longitude);
      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("map"),
          mapOptions);

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: location.name
      });

      $scope.map = map;
    }

    for (var key in loc) {
      if (loc.hasOwnProperty(key) == false) {continue};
      if ($stateParams.locationId != loc[key]['id']) {continue};
      $scope.location = loc[key];
      initializeMap(loc[key]);
    }//for
    
  });
});

