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


})

.controller('MainCtrl', function($scope, $interval, $rootScope, $ionicPopup) {
	/*
	payment data:
		any data type

	wallet provider:
		int id

	and send phone ID
	and send geolocation data

	keep socket open until the transaction is complete


	*/

	$rootScope.ccVendor = function getMerchantProvider(cardNo){                      //cardNo is the credit card number
		var cards = new Array();
		cards [0] = {cardName: "Visa",prefixes: "4"};
		cards [1] = {cardName: "Mastercard", prefixes: "51,52,53,54,55"};
		cards [2] = {cardName: "DinersClub", prefixes: "300,301,302,303,304,305,36,38,55"};
		cards [3] = {cardName: "CarteBlanche", prefixes: "300,301,302,303,304,305,36,38"};
		cards [4] = {cardName: "American Express", prefixes: "34,37"};
		cards [5] = {cardName: "Discovery",  prefixes: "6011,650"};
		cards [6] = {cardName: "JCB", prefixes: "3,1800,2131"};
		cards [7] = {cardName: "enRoute", prefixes: "2014,2149"};
		cards [8] = {cardName: "Solo", prefixes: "6334, 6767"};
		cards [9] = {cardName: "Switch", prefixes: "4903,4905,4911,4936,564182,633110,6333,6759"};
		cards [10] = {cardName: "Maestro", prefixes: "5020,6"};
		cards [11] = {cardName: "VisaElectron", prefixes: "417500,4917,4913"};
		var prefix
		var cardType

		for(cardType=0; cardType<cards.length; cardType++){
			prefix = cards[cardType].prefixes.split(",");
			for (i=0; i<prefix.length; i++) {
				var exp = new RegExp ("^" + prefix[i]);
				if (exp.test (cardNo))
					return cards[cardType].cardName;
			}
		}
		return "Invalid";
	}

});
