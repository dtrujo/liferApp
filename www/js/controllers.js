angular.module('liferapp.controllers', [])


/**
 * Content Controller
 */
.controller('ContentController', function($scope, $state){
})


/**
 * Dashboard Controller
 */
.controller('DashboardController', function($ionicHistory, $scope, $state, $ionicViewSwitcher, $ionicSideMenuDelegate){

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

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {
		
		// Show element waiting
		$ionicLoading.show({
			template:'<img src="img/lifericon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    	noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
				
		// Access to the event calling service 
		API.getEvents().success( function (data){	
		
			// Pass to events binding and hidden loading
			$scope.events = data;
			$ionicLoading.hide();
		});
    });
	
	// go to event's details pass params to find the
	// single event and acceso data
	$scope.eventDetails = function(index){
		var event = $scope.events[index];
		$state.go('eventmenu.eventDetails', { "id": event.Codigo });
	};
})


/**
 * Event details Controller
 */
.controller('EventDetailsController', function($scope, $stateParams, $state, $http, API, $ionicLoading){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
				
		// Access to the event calling service using the code 
		API.getEventById($stateParams.id).success( function (data){
			
			// pass to events binding and hidden loading
			$scope.event = data;
			$ionicLoading.hide();
		});
    });
	
	// go to event's map
	$scope.eventMap = function(){
		$state.go('eventmenu.eventMap', { "coordenadas": $scope.event.Coordenadas });
	};
})


/**
 * Event Map Controller
 */
.controller('EventMapController', function($scope, $stateParams, $state, $ionicLoading){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// initial location
	$scope.myLocation = {
    	lng : $stateParams.coordenadas.split(",")[1],
    	lat: $stateParams.coordenadas.split(",")[0]
  	}

   	// this function create map and prepare params
   	// and the marker position in to the map
  	$scope.drawMap = function(position) {

  		// $scope.$apply is needed to trigger the digest cycle 
  		// when the geolocation arrives and to update all the watchers
    	$scope.$apply(function() {
	   
	    	//$scope.myLocation.lng = position.coords.longitude;
	      	//$scope.myLocation.lat = position.coords.latitude;
	 
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
		
		// hide loader
		$ionicLoading.hide();
	}

	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
						
		// when the map is loaded we draw the map 
		// passing how params the draw function
   		navigator.geolocation.getCurrentPosition($scope.drawMap);
    });
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
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
			
		// Access to the event calling service 
		API.getNews().success( function (data){
			
			// pass to events binding adn hiden loading
			$scope.news = data;
			$ionicLoading.hide();
		});
    });
	
	// go to event's details
	$scope.newDetails = function(index){
		var single = $scope.news[index];
		$state.go('eventmenu.newDetails', { "id": single.Codigo });
	};
	
	// Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/FilterNewView.html', function($ionicModal) 
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
})


/**
 * New details Controller
 */
.controller('NewDetailsController', function($scope, $state, $ionicLoading, $stateParams, API){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
				
		// Access to the event calling service using the code 
		API.getNewById($stateParams.id).success( function (data){
			
			// pass to events binding and hidden loading
			$scope.new = data;
			$ionicLoading.hide();
		});
    });	
})


/**
 * Articles Controller
 */
.controller('ArticlesController', function($scope, $state, $http, API, $ionicLoading, $ionicModal){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });

	// Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/FilterArticleView.html', function($ionicModal) 
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

	// go to articlesTop's details
	$scope.articleTopDetails = function(index){
		var article = $scope.articlesTop[index];
		$state.go('eventmenu.articleDetails', {"codigo" : article.Codigo});
	};
	
	// go to articlesOutlet's details
	$scope.articleOutletDetails = function(index){
		var article = $scope.articleOutlet[index];
		$state.go('eventmenu.articleDetails', {"codigo" : article.Codigo});
	};
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
				
		// Access to the articles calling service 
		API.getArticles().success( function (data){

			// pass to events binding adn hiden loading
			$scope.articlesTop = data;
			$scope.articlesOutlet = data;
	
			$ionicLoading.hide();
		});
    });	
})


/**
 * Article details Controller
 */
.controller('ArticleDetailsController', function($scope, $state, $ionicLoading, $stateParams, API){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {

		// Access to the event calling service using the code 
		API.getArticleByCode($stateParams.codigo).success( function (data){
			
			// pass to events binding and hidden loading
			$scope.article = data;
			$ionicLoading.hide();
		});
    });	
})


/**
 * Shops Controller
 */
.controller('ShopsController', function($scope, $state, $http, API, $ionicLoading, $ionicModal){
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
			
		// Access to the articles calling service 
		API.getShops().success( function (data){
			
			// pass to events binding adn hiden loading
			$scope.shops = data;
			$ionicLoading.hide();
		});
    });
	
	// go to event's details
	$scope.shopDetails = function(index){
		var shop = $scope.shops[index];
		$state.go('eventmenu.shopDetails', { "id": shop.Codigo });
	};
	
	// Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/FilterShopView.html', function($ionicModal) 
    	{ $scope.modal = $ionicModal; }, 
    	{
			scope: $scope,
			animation: 'popIn'
    	}
    ); 
	
	// show article filter
	$scope.shopsFilter = function(){
		$scope.modal.show();
	}
})


/**
 * Shop details Controller
 */
.controller('ShopDetailsController', function($scope, $state, $ionicLoading, $stateParams, API){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
				
		// Access to the event calling service using the code 
		API.getShopById($stateParams.id).success( function (data){
		   
			// pass to events binding and hidden loading
			$scope.shop = data;
			$ionicLoading.hide();
		});
    });	

	// go to event's map
	$scope.shopMap = function(){
		$state.go('eventmenu.shopMap', { "coordenadas": $scope.shop.Coordenadas });
	};
	
	// call telephone
  	$scope.call = function (){
  		document.location.href = 'tel:+1-800-555-1234';
  	}
})


/**
 * Shop Map Controller
 */
.controller('ShopMapController', function($scope, $stateParams, $state, $ionicLoading){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// initial location
	$scope.myLocation = {
    	lng : $stateParams.coordenadas.split(",")[1],
    	lat: $stateParams.coordenadas.split(",")[0]
  	}

   	// this function create map and prepare params
   	// and the marker position in to the map
  	$scope.drawMap = function(position) {

  		// $scope.$apply is needed to trigger the digest cycle 
  		// when the geolocation arrives and to update all the watchers
    	$scope.$apply(function() {

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
		
		// hide loader
		$ionicLoading.hide();
	}

	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
						
		// when the map is loaded we draw the map 
		// passing how params the draw function
   		navigator.geolocation.getCurrentPosition($scope.drawMap);
    });
})


/**
 * Clients Controller
 */
.controller('ClientsController', function($scope, $state){
	
})