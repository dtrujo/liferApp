angular.module('liferapp.controllers', [])


/**
 * Content Controller
 */
.controller('ContentController', function($scope, $state, $ionicSideMenuDelegate){
	
	// create effect fot the toggle menu
	$scope.toggleLeft = function() {
    	$ionicSideMenuDelegate.toggleLeft();
  	};
})


/**
 * Dashboard Controller
 */
.controller('DashboardController', function($scope, $state, $ionicViewSwitcher){

	// go to events
	$scope.events = function(){
		$state.go('eventmenu.events');
	};

	// go to news
	$scope.news = function(){
		$state.go('eventmenu.news');
	};

	// go to offers
	$scope.offers = function(){
		$state.go('eventmenu.offers');
	};

	// go to clients
	$scope.clients = function(){
		$state.go('eventmenu.clients');
	};

	// go to articles
	$scope.articles = function(){
		$state.go('eventmenu.articles');
	};

	// go to shops
	$scope.shops = function(){
		$state.go('eventmenu.shops');
	};
})


/**
 * Events Controller
 */
.controller('EventsController', function($scope, $state, $http, API, $ionicLoading){

	// go to event's details
	$scope.eventDetails = function(){
		$state.go('eventmenu.eventDetails');
	};
	
    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/lifericon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    noBackdrop: true
	});

	// Access to the event calling service 
	API.getEvents().success( function (data){
		
		// pass to events binding adn hiden loading
		$scope.events = data;
		$ionicLoading.hide();
	});
})


/**
 * Event details Controller
 */
.controller('EventDetailsController', function($scope, $state, $ionicLoading){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 2000,
	    noBackdrop: true
	});

	// go to event's map
	$scope.eventMap = function(){
		$state.go('eventmenu.eventMap');
	};
})


/**
 * Event Map Controller
 */
.controller('EventMapController', function($scope, $state, $ionicLoading){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 5000,
	    noBackdrop: true
	});

	// initial location
	$scope.myLocation = {
    	lng : '',
    	lat: ''
  	}

   	// this function create map and prepare params
   	// and the marker position in to the map
  	$scope.drawMap = function(position) {

  		// $scope.$apply is needed to trigger the digest cycle 
  		// when the geolocation arrives and to update all the watchers
    	$scope.$apply(function() {
	   
	    	$scope.myLocation.lng = position.coords.longitude;
	      	$scope.myLocation.lat = position.coords.latitude;
	 
	 		// map
	      	$scope.map = {
	        	center: {
	          		latitude: $scope.myLocation.lat,
	          		longitude: $scope.myLocation.lng
	        	},
	        	zoom: 14,
	        	pan: 1
	      	};
	 
	 		// marker
	      	$scope.marker = {
	        	id: 0,
	        	coords: {
	          		latitude: $scope.myLocation.lat,
	          		longitude: $scope.myLocation.lng
	        	}
	      	};
	       
	       	// marker options
	      	$scope.marker.options = {
	        	draggable: false,
	        	labelContent: "lat: " + $scope.marker.coords.latitude + '<br/> ' + 'lon: ' + $scope.marker.coords.longitude,
	        	labelAnchor: "80 120",
	        	labelClass: "marker-labels"
	      	};
	    });
	}

	// when the map is loaded we draw the map 
	// passing how params the draw function
   	navigator.geolocation.getCurrentPosition($scope.drawMap);
})


/**
 * Offers Controller
 */
.controller('OffersController', function($scope, $state, $ionicLoading){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 2000,
	    noBackdrop: true
	});

	// go to offers's details
	$scope.offerDetails = function(){
		$state.go('eventmenu.offerDetails');
	};

	// create offer manually, later we will 
	// change with the data API provider
	var offers = [];
	for (i = 1; i < 100; i++) { 
	    var newOffer = 
	    { 
	    	'Id' : i,	    	
	    	'Title' : 'Título de la oferta ' + i,
     	  	'Description' : 'Descripción de la oferta ' + i,
     	  	'Date' : "Jueves 3, Julio 2015",
     	  	'Time' : "14:30",
     	  	'Img': 'http://83.36.56.136/Fotos/045003131.jpg',
     	  	'Expire': 'Fin de existencias'
     	}
     	offers.push(newOffer);
	}

	// pass to news binding
	$scope.offers = offers;
})


/**
 * Offer details Controller
 */
.controller('OfferDetailsController', function($scope, $state, $ionicLoading){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 2000,
	    noBackdrop: true
	});
})


/**
 * News Controller
 */
.controller('NewsController', function($scope, $state, $ionicLoading, API, $ionicModal){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    noBackdrop: true
	});

	// Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/FilterView.html', function($ionicModal) 
    	{ $scope.modal = $ionicModal; }, 
    	{
			scope: $scope,
			animation: 'popIn'
    	}
    ); 

	// show article filter
	$scope.newsFilter = function(){
		$scope.modal.show();
	}

	// go to event's details
	$scope.newDetails = function(){
		$state.go('eventmenu.newDetails');
	};

	// Access to the event calling service 
	API.getNews().success( function (data){
		
		// pass to events binding adn hiden loading
		$scope.news = data;
		$ionicLoading.hide();
	});
})


/**
 * New details Controller
 */
.controller('NewDetailsController', function($scope, $state, $ionicLoading){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 2000,
	    noBackdrop: true
	});
})


/**
 * Articles Controller
 */
.controller('ArticlesController', function($scope, $state, $http, API, $ionicLoading, $ionicModal){

	// setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    noBackdrop: true
	});

	// Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/FilterView.html', function($ionicModal) 
    	{ $scope.modal = $ionicModal; }, 
    	{
			scope: $scope,
			animation: 'popIn'
    	}
    ); 

	// show article filter
	$scope.articlesFilter = function(){
		$scope.modal.show();
	}

	// go to articles's details
	$scope.articleDetails = function(){
		$state.go('eventmenu.articleDetails');
	};

	// Access to the articles calling service 
	API.getArticles().success( function (data){
		
		// pass to events binding adn hiden loading
		$scope.articlesTop = data;
		$scope.articlesOffer = data;
		$scope.articlesOutlet = data;

		$ionicLoading.hide();
	});
})


/**
 * Article details Controller
 */
.controller('ArticleDetailsController', function($scope, $state, $ionicLoading){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 2000,
	    noBackdrop: true
	});
})


/**
 * Clients Controller
 */
.controller('ClientsController', function($scope, $state){
})


/**
 * Shops Controller
 */
.controller('ShopsController', function($scope, $state, $http, API, $ionicLoading, $ionicModal){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    noBackdrop: true
	});

	// Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/FilterView.html', function($ionicModal) 
    	{ $scope.modal = $ionicModal; }, 
    	{
			scope: $scope,
			animation: 'popIn'
    	}
    ); 

	// show shop filter
	$scope.shopsFilter = function(){
		$scope.modal.show();
	}

	// go to shop's details
	$scope.shopDetails = function(){
		$state.go('eventmenu.shopDetails');
	};

	// Access to the articles calling service 
	API.getTiendas().success( function (data){
		
		// pass to events binding adn hiden loading
		$scope.shops = data;
		
		$ionicLoading.hide();
	});
})


/**
 * Shop details Controller
 */
.controller('ShopDetailsController', function($scope, $state, $ionicLoading){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 5000,
	    noBackdrop: true
	});

	// initial location
	$scope.myLocation = {
    	lng : '',
    	lat: ''
  	}

  	// call telephone
  	$scope.call = function (){
  		console.log('esto');
  		document.location.href = 'tel:+1-800-555-1234';
  	}

   	// this function create map and prepare params
   	// and the marker position in to the map
  	$scope.drawMap = function(position) {

  		// $scope.$apply is needed to trigger the digest cycle 
  		// when the geolocation arrives and to update all the watchers
    	$scope.$apply(function() {
	   
	    	$scope.myLocation.lng = position.coords.longitude;
	      	$scope.myLocation.lat = position.coords.latitude;
	 
	 		// map
	      	$scope.map = {
	        	center: {
	          		latitude: $scope.myLocation.lat,
	          		longitude: $scope.myLocation.lng
	        	},
	        	zoom: 14,
	        	pan: 1
	      	};
	 
	 		// marker
	      	$scope.marker = {
	        	id: 0,
	        	coords: {
	          		latitude: $scope.myLocation.lat,
	          		longitude: $scope.myLocation.lng
	        	}
	      	};
	       
	       	// marker options
	      	$scope.marker.options = {
	        	draggable: false,
	        	labelContent: "lat: " + $scope.marker.coords.latitude + '<br/> ' + 'lon: ' + $scope.marker.coords.longitude,
	        	labelAnchor: "80 120",
	        	labelClass: "marker-labels"
	      	};
	    });
	}

	// when the map is loaded we draw the map 
	// passing how params the draw function
   	navigator.geolocation.getCurrentPosition($scope.drawMap);
})