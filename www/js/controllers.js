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
.controller('EventsController', function($scope, $state, $ionicLoading){

	// go to event's details
	$scope.eventDetails = function(){
		$state.go('eventmenu.eventDetails');
	};
	
    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/lifericon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 2000,
	    noBackdrop: true
	});

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
.controller('NewsController', function($scope, $state, $ionicLoading, $ionicModal){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 2000,
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
.controller('ArticlesController', function($scope, $state, $ionicLoading, $ionicModal){

	// setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 2000,
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

	// create articles manually, later we will 
	// change with the data API provider
	var articlesTop = [];
	var articlesOffer = [];
	var articlesOutlet = [];

	for (i = 1; i < 100; i++) { 
	    var articleTopNew = 
	    { 
	    	'Id' : i,
	    	'Name' : 'Artículo Top ' + i,
     	  	'Description' : 'Descripción del artículo ' + i,
     	  	'Reference' : 'AX00000025',
     	  	'Available' : 'Disponible',
     	  	'Family': 'Psicomotricidad Fina',
     	  	'Age': '3 - 8 años',
     	  	'Price': '125€',
     	  	'Img': 'http://83.36.56.136/Fotos/045003131.jpg'
     	}
     	var articleOfferNew = 
	    { 
	    	'Id' : i,
	    	'Name' : 'Artículo Offer ' + i,
     	  	'Description' : 'Descripción del artículo ' + i,
     	  	'Reference' : 'BCDE000025',
     	  	'Available' : 'Disponible',
     	  	'Family': 'Construcciones y Puzzles',
     	  	'Age': '+11 años',
     	  	'Price': '15€',
     	  	'Img': 'http://83.36.56.136/Fotos/125010572.jpg'
     	}
     	var articleOutletNew = 
	    { 
	    	'Id' : i,
	    	'Name' : 'Artículo Outlet ' + i,
     	  	'Description' : 'Descripción del artículo ' + i,
     	  	'Reference' : 'AX002342025',
     	  	'Available' : 'Disponible',
     	  	'Family': 'Mobiliario escuelas',
     	  	'Age': '1 - 3 años',
     	  	'Price': '325€',
     	  	'Img': 'http://83.36.56.136/Fotos/084801229.jpg'
     	}

     	articlesTop.push(articleTopNew);
     	articlesOffer.push(articleOfferNew);
     	articlesOutlet.push(articleOutletNew);
	}

	// pass to articles binding
	$scope.articlesTop = articlesTop;
	$scope.articlesOffer = articlesOffer;
	$scope.articlesOutlet = articlesOutlet;
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
.controller('ShopsController', function($scope, $state, $ionicLoading, $ionicModal){

    // setup the loader and show spinner
	$ionicLoading.show({
		template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
	    duration: 2000,
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

	// create shops manually, later we will 
	// change with the data API provider
	var shops = [
		{ 
	    	'Id' : '1',
	    	'Name' : 'Tienda Tenerife 1 ',
     	  	'Direction' : 'C/ La laguna esquina derecha',
     	  	'Country' : "España",
     	  	'State': 'Sta. Cruz de Tenerife',
     	  	'City' : "La Laguna",
     	  	'Tlf': '+34 922 345 566',
     	  	'Email': 'liferlalaguna@lifer.com',
     	  	'Web': 'www.lifer.es',
     	  	'Description': 'Descripción tienda de La Laguna',
     	  	'Scheduler': 'L-V de 10:00-13:00 y 16:30 - 20:00',
     	  	'Img':'img/tenerifeicon.png'
     	},{ 
	    	'Id' : '2',
	    	'Name' : 'Tienda Tenerife 2 ',
     	  	'Direction' : 'C/ La laguna esquina Izquierda',
     	  	'Country' : "España",
     	  	'State': 'Sta. Cruz de Tenerife',
     	  	'City' : "La Laguna",
     	  	'Tlf': '+34 922 345 566',
     	  	'Email': 'liferlalaguna@lifer.com',
     	  	'Web': 'www.lifer.es',
     	  	'Description': 'Descripción tienda de La Laguna',
     	  	'Scheduler': 'L-V de 10:00-13:00 y 16:30 - 20:00',
     	  	'Img':'img/tenerifeicon.png'
     	},{ 
	    	'Id' : '3',
	    	'Name' : 'Tienda Tenerife 3 ',
     	  	'Direction' : 'C/ La laguna esquina derecha',
     	  	'Country' : "España",
     	  	'State': 'Sta. Cruz de Tenerife',
     	  	'City' : "La Laguna",
     	  	'Tlf': '+34 922 345 566',
     	  	'Email': 'liferlalaguna@lifer.com',
     	  	'Web': 'www.lifer.es',
     	  	'Description': 'Descripción tienda de La Laguna',
     	  	'Scheduler': 'L-V de 10:00-13:00 y 16:30 - 20:00',
     	  	'Img':'img/tenerifeicon.png'
     	},{ 
	    	'Id' : '4',
	    	'Name' : 'Tienda La Palma 1 ',
     	  	'Direction' : 'C/ La laguna esquina derecha',
     	  	'Country' : "España",
     	  	'State': 'Sta. Cruz de Tenerife',
     	  	'City' : "La Palmas",
     	  	'Tlf': '+34 922 345 566',
     	  	'Email': 'liferlalaguna@lifer.com',
     	  	'Web': 'www.lifer.es',
     	  	'Description': 'Descripción tienda de La Laguna',
     	  	'Scheduler': 'L-V de 10:00-13:00 y 16:30 - 20:00',
     	  	'Img':'img/lapalmaicon.png'
     	},{ 
	    	'Id' : '5',
	    	'Name' : 'Tienda Las Palmas 1',
     	  	'Direction' : 'C/ León y Castillo',
     	  	'Country' : "España",
     	  	'State': 'Las Palmas de G.C.',
     	  	'City' : "Las Palmas de G.C.",
     	  	'Tlf': '+34 922 345 566',
     	  	'Email': 'liferlaspalmas@lifer.com',
     	  	'Web': 'www.lifer.es',
     	  	'Description': 'Descripción tienda de Las Palmas',
     	  	'Scheduler': 'L-V de 10:00-13:00 y 16:30 - 20:00',
     	  	'Img':'img/grancanariaicon.png'
     	},{ 
	    	'Id' : '6',
	    	'Name' : 'Tienda Las Palmas 2 ',
     	  	'Direction' : 'C/ León y Castillo',
     	  	'Country' : "España",
     	  	'State': 'Las Palmas de G.C.',
     	  	'City' : "Las Palmas de G.C.",
     	  	'Tlf': '+34 922 345 566',
     	  	'Email': 'liferlaspalmas@lifer.com',
     	  	'Web': 'www.lifer.es',
     	  	'Description': 'Descripción tienda de Las Palmas',
     	  	'Scheduler': 'L-V de 10:00-13:00 y 16:30 - 20:00',
     	  	'Img':'img/grancanariaicon.png'
     	},{ 
	    	'Id' : '7',
	    	'Name' : 'Tienda Fuerteventura 1 ',
     	  	'Direction' : 'C/ Puerto del Rosario',
     	  	'Country' : "España",
     	  	'State': 'Las Palmas de G.C.',
     	  	'City' : "Las Palmas de G.C.",
     	  	'Tlf': '+34 922 345 566',
     	  	'Email': 'liferfuerteventura@lifer.com',
     	  	'Web': 'www.lifer.es',
     	  	'Description': 'Descripción tienda de Fuerteventura',
     	  	'Scheduler': 'L-V de 10:00-13:00 y 16:30 - 20:00',
     	  	'Img':'img/fuerteventuraicon.png'
     	}
    ];

	// pass to news binding
	$scope.shops = shops;
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