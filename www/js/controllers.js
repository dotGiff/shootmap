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

.controller('ListCtrl', ['$scope', '$http', 'Locations', 'myMap', function($scope, $http, Locations, myMap) {
  $scope.locations;
  getLocations();

  function getLocations(){
    Locations.getLocations()
      .success(function(loc){
        $scope.locations = loc;
        var addresses = [];
        for (var i = 0; i < loc.length; i++) {
          addresses[loc[i]['id']] = myMap.address(loc[i]['coordinates']['latitude'],loc[i]['coordinates']['longitude']);
        }
        console.log(addresses);
      }).
      error(function(error){
        $scope.locations = 'whoops, something went wrong: ' + error.message;
      });
  }
}])

.controller('LocationsCtrl', ['$scope', '$stateParams', '$http', '$ionicLoading', '$compile', 'Locations', 'myMap', function($scope, $stateParams, $http, $ionicLoading, $compile, Locations, myMap) {
  $http.get('json/locations.json').success(function(data){
    loc = data;
    for (var key in loc) {
      if (loc.hasOwnProperty(key) == false) {continue};
      if ($stateParams.locationId != loc[key]['id']) {continue};
      $scope.location = loc[key];
      $scope.map = myMap.basicMap(loc[key], 'map');
    }//for
    
  });
}]);

