angular.module('liferapp.controllers', [])



/**
 * _Dashboard Controller
 */



/**
 * Dashboard Controller
 */
.controller('DashboardController', function($timeout, $ionicHistory, $scope, $state, $ionicViewSwitcher, $ionicSideMenuDelegate){

	// inizializate object
	$scope.property = {};

	// Reset animation before loaded view each time
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {
		$scope.property.animatedEvent = "";	
    });
	
	// go to events
	$scope.events = function(){
		
		// add class
		$scope.property.animatedEvent = "rubberBand";
		
		// wait 2 sec to change state go to events view
		$timeout(function(){
			$scope.property.animatedEvent = "";	
			$state.go('eventmenu.events');
		}, 1000);   
	};

	// go to news
	$scope.news = function(){
		
		// add class
		$scope.property.animatedNew = "rubberBand";
		
		// wait 2 sec to change state go to new view
		$timeout(function(){
			$scope.property.animatedNew = "";	
			$state.go('eventmenu.news');
		}, 1500); 
	};

	// go to offers
	$scope.offers = function(){
		
		// add class
		$scope.property.animatedOffer = "rubberBand";
		
		// wait 2 sec to change state go to offer view
		$timeout(function(){
			$scope.property.animatedOffer = "";	
			$state.go('eventmenu.offers');
		}, 1000); 
	};

	// go to clients
	$scope.clients = function(){
		
		// add class
		$scope.property.animatedClient = "rubberBand";
		
		// wait 2 sec to change state go to client view
		$timeout(function(){
			$scope.property.animatedClient = "";	
			$state.go('eventmenu.clients');
		}, 1000); 
	};

	// go to articles
	$scope.articles = function(){
		
		// add class
		$scope.property.animatedArticle = "rubberBand";
		
		// wait 2 sec to change state go to article view
		$timeout(function(){
			$scope.property.animatedArticle = "";	
			$state.go('eventmenu.articles');
		}, 1000);
	};

	// go to shops
	$scope.shops = function(){
		
		// add class
		$scope.property.animatedShop = "rubberBand";
		
		// wait 2 sec to change state go to shop view
		$timeout(function(){
			$scope.property.animatedShop = "";	
			$state.go('eventmenu.shops');
		}, 1000);
	};
})



/**
 * _Events Controller
 */



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
			template:'<img src="img/lifericon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
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
			template:'<img src="img/lifericon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
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
 * _Offers Controller
 */



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
 * _News Controller
 */



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
 * _Articles
 */



/**
 * Articles Controller
 */
.controller('ArticlesController', function($scope, $state, $http, API, $ionicLoading, $ionicModal){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/chickenicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
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
	
	// hide modal and change the view going to search filter view
  	$scope.filterArticles = function(index) {
		$scope.modal.hide();
  	};

	// show article filter
	$scope.articlesFilter = function(){
		$scope.modal.show();
	}

	// article search view
	$scope.articlesSearch = function(){
		$state.go('eventmenu.articlesSearch');
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
 * Article Search Controller
 */
.controller('ArticlesSearchController', function($scope, $state, $ionicLoading, $stateParams, API){
	
	$scope.filter = {};
	
	// Make actions when the view be loaded
	// we can add families in this point
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {
	
			// Get all families calling service
			API.getFamilies().success( function (data){
	
				// pass to articles binding adn hiden loading
				$scope.families = data;
			});	
    });	
	
	// search function using input values
	$scope.searchArticle = function (){
		
		// check if there is reference value
		if (this.reference)
		{
			// if we have a reference we can redirect automatically to details view
			// here we can check if the articles exit or not and show screen if it isnt
			$state.go('eventmenu.articleDetails', {"codigo" : this.reference});
		}
		else{
			
			// check if the family and age are undefined
			var key = ($scope.filter.key) ? $scope.filter.key : '';
			var fam = ($scope.filter.family) ? $scope.filter.family : '';
			var age = ($scope.filter.age) ? $scope.filter.age : '';
			var pmin = ($scope.filter.minPrice) ? $scope.filter.minPrice : '';
			var pmax = ($scope.filter.maxPrice) ? $scope.filter.maxPrice : '';
			
			// if we havent reference, we need to find using the diferent types of filter
			// we redirect to list view to result view
			var filter = "key=" + key + 
						 "&fam=" + fam +  
						 "&edad=" + age +  
						 "&pmin=" +  pmin + 
						 "&pmax=" +  pmax;
			
			console.log(filter);
			
			// go to search result
			$state.go('eventmenu.articlesSearchResult', {"filtro" : filter});
		}
	}
})


/**
 * Articles Search Result Controller
 */
.controller('ArticlesSearchResultController', function(
	$scope, $ionicScrollDelegate, $stateParams, $state, $http, API, $ionicLoading, $ionicModal){
	
	var init, filter;

	// initialize the articles list
	$scope.articles = [];
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/chickenicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
		
		// control if there are articles for not reload the list
		if ($scope.articles.length == 0)
		{
			init = 0;
			filter = $stateParams.filtro + "&init=" + init + "&count=9";
			
			// Access to the articles calling service
			API.getArticlesByFilter(filter).success( function (data){
	
				// pass to articles binding adn hiden loading
				$scope.articles = data;
				$ionicLoading.hide();
				
				// update new init to take articles
				init += 10;
			});
		}
    });	
	
 	// load more articles while we can do it
	$scope.loadMore = function() {

		// refresh the filter to take actual init value
		filter = $stateParams.filtro + "&init=" + init + "&count=10";
		
		// Access to the articles calling service 
		API.getArticlesByFilter(filter).success( function (data){
			
			// add articles in to array
			data.forEach(function(element) {
				$scope.articles.push(element);
			}, this);
			
			// update new init to take articles
			init += 11;
			
			// stop scroll
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	// go to articles's details
	$scope.articleDetails = function(index){
		var article = $scope.articles[index];
		$state.go('eventmenu.articleDetails', {"codigo" : article.Codigo});
	};
})


/**
 * Article details Controller
 */
.controller('ArticleDetailsController', function($scope, $state, $ionicLoading, $stateParams, API){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/chickenicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
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
 * _Shops Controller
 */



/**
 * Shops Controller
 */
.controller('ShopsController', function($scope, $state, $http, API, $ionicLoading, $ionicModal){
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/pinkicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
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
			template:'<img src="img/pinkicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
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
			template:'<img src="img/pinkicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
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
 * _Clients Controller
 */



/**
 * Clients Controller
 */
.controller('ClientsController', function($scope, $state){
	
})



/**
 * _Content Controller
 */



/**
 * Content Controller
 */
.controller('ContentController', function($scope, $state){
	
})

