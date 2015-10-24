var temp;
var app = angular.module('ionicApp', ['ionic', 'ionic.utils'])
var utilities = angular.module('ionic.utils', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('tabs', {
		url: "/tab",
		abstract: true,
		templateUrl: "templates/tabs.html"
	})
		.state('tabs.home', {
		url: "/home",
		views: {
			'home-tab': {
				templateUrl: "templates/home.html",
				controller: 'HomeTabCtrl'
			}
		}
	})
		.state('tabs.settings', {
		url: "/settings",
		views: {
			'settings-tab': {
				templateUrl: "templates/settings.html",
				controller: 'SettingsTabCtrl'
			}
		}
	});


	$urlRouterProvider.otherwise("/tab/home");

})

.controller('HomeTabCtrl', function($scope, $interval, $rootScope, $ionicPopup) {


})

.controller('SettingsTabCtrl', function($scope, $interval, $rootScope, $ionicPopup) {


});
