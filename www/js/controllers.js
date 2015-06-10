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
.controller('DashboardController', function($scope, $state){

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
.controller('EventsController', function($scope, $state){

	// go to event's details
	$scope.eventDetails = function(){
		$state.go('eventmenu.eventDetails');
	};

	// create events manually, later we will 
	// change with the data API provider
	var events = [];
	for (i = 1; i < 100; i++) { 
	    var newEvent = 
	    { 
	    	'Id' : i,
	    	'Title' : 'Título del Evento ' + i,
     	  	'Description' : 'Descripción del evento ' + i,
     	  	'Date' : "Martes 3, Abril 2015",
     	  	'Time' : "14:30",
     	  	'Scheduler' : '10:00-13:00 y 16:00-20:00',
     	  	'Place' : 'Plaza de la Trinidad',
     	  	'Direction' : 'C/ La Langosta, 5',
     	  	'City' : 'La Laguna',
     	  	'Country' : 'Sta. Cruz de Tenerife'
     	}
     	events.push(newEvent);
	}

	// pass to events binding
	$scope.events = events;
})


/**
 * Event details Controller
 */
.controller('EventDetailsController', function($scope, $state){

	// go to event's map
	$scope.eventMap = function(){
		$state.go('eventmenu.eventMap');
	};
})


/**
 * Event Map Controller
 */
.controller('EventMapController', function($scope, $state){

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
.controller('OffersController', function($scope, $state){

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
.controller('OfferDetailsController', function($scope, $state){
})


/**
 * News Controller
 */
.controller('NewsController', function($scope, $state){

	// go to event's details
	$scope.newDetails = function(){
		$state.go('eventmenu.newDetails');
	};

	// create news manually, later we will 
	// change with the data API provider
	var news = [];
	for (i = 1; i < 100; i++) { 
	    var newNew = 
	    { 
	    	'Id' : i,
	    	'Title' : 'Título de la noticia ' + i,
     	  	'Description' : 'Descripción de la noticia ' + i,
     	  	'Date' : "Jueves 3, Julio 2015",
     	  	'Time' : "14:30",
     	  	'Author': 'dtrujo',
     	  	'Category': 'Juegos Infantiles'
     	}
     	news.push(newNew);
	}

	// pass to news binding
	$scope.news = news;
})


/**
 * New details Controller
 */
.controller('NewDetailsController', function($scope, $state){
})


/**
 * Articles Controller
 */
.controller('ArticlesController', function($scope, $state){
})


/**
 * Clients Controller
 */
.controller('ClientsController', function($scope, $state){
})


/**
 * Shops Controller
 */
.controller('ShopsController', function($scope, $state){
})
