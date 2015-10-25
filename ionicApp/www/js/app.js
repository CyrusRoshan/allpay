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

.controller('MainCtrl', function($scope, $interval, $rootScope, $ionicPopup, $ionicModal) {
	/*
	payment data:
		any data type

	wallet provider:
		int id

	and send phone ID
	and send geolocation data

	keep socket open until the transaction is complete


	*/

	//cc validation here
	$rootScope.ccVendor = function getMerchantProvider(cardNo){
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


	//modal stuff here
	$ionicModal.fromTemplateUrl('cards.html', {
		id: 'cards',
		scope: $scope,
		backdropClickToClose: false,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.oModal1 = modal;
	});

	$ionicModal.fromTemplateUrl('security.html', {
		id: 'security',
		scope: $scope,
		backdropClickToClose: false,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.oModal2 = modal;
	});

	$ionicModal.fromTemplateUrl('makePayment.html', {
		id: 'makePayment',
		scope: $scope,
		backdropClickToClose: false,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.oModal3 = modal;
	});

	$scope.openModal = function(index) {
		if(index == 1){
			$scope.oModal1.show();
		}
		else if(index == 2){
			$scope.oModal2.show();
		}
		else if(index == 3){
			$rootScope.cardSelected = false;
			$scope.oModal3.show();
		}
	};

	$rootScope.modalModify = [];

	$scope.modifyModal = function(index) {
		if($rootScope.modalModify[index]){
			$rootScope.modalModify[index] = false;
		}
		else{
			$rootScope.modalModify[index]= true;
		}
	}

	$scope.closeModal = function(index) {
		if(index == 1){
			$scope.oModal1.hide();
		}
		else if(index == 2){
			$scope.oModal2.hide();
		}
		else if(index == 3){
			$scope.oModal3.hide();
		}
	};

	$scope.$on('$destroy', function() {
		$scope.oModal1.remove();
		$scope.oModal2.remove();
		$scope.oModal3.remove();
	});

	$scope.deleteCard = function(card){
		$rootScope.cards.splice($rootScope.cards.indexOf(card), 1);
	};

	$scope.selectCard = function(card){
		$rootScope.cardSelected = true;
		$rootScope.selectedCard = card;
	}

	$rootScope.cards = [
		{
			vendor: "Mastercard",
			number: 5499990123456781
		},

		{
			vendor: "Visa",
			number: 4539957024259452,
		},

		{
			vendor: "Mastercard",
			number: 5483558219303916,
		},

		{
			vendor: "Visa",
			number: 4929082154113334,
		},

		{
			vendor: "Discover",
			number: 6011264570504817,
		},
	]

});
