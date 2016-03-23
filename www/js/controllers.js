angular.module('liferapp.controllers', [])



/**
 * _Dashboard Controller
 */



/**
 * Dashboard Controller
 */
.controller('DashboardController', function($timeout, $ionicPopover, $ionicHistory, $scope, $state, $ionicViewSwitcher, $ionicSideMenuDelegate){

	// inizializate object
	$scope.property = {};

	// Reset animation before loaded view each time
	$scope.$on('$ionicView.loaded', function (viewInfo, state) {
		$scope.property.animatedEvent = "";	
    });
	
    // show popover with the options 
    $ionicPopover.fromTemplateUrl('templates/DashBoardPopoverView.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
    
    // go to bonus
    $scope.bonus = function (){ 
        
        // remove popoup before to change the state
		$scope.popover.hide();                   
		$state.go('eventmenu.bonus');  
    };
    
    // go to legal
    $scope.legalWarning = function (){ 
        
        // remove popoup before to change the state
		$scope.popover.hide();                   
		$state.go('eventmenu.legal');  
    };
    
	// go to events
	$scope.events = function(){
		
		// add class
		$scope.property.animatedEvent = "rubberBand";
		
		// wait to change state go to events view
		$timeout(function(){
			$scope.property.animatedEvent = "";	
			$state.go('eventmenu.events');
		}, 1000);   
	};

	// go to news
	$scope.news = function(){
		
		// add class
		$scope.property.animatedNew = "rubberBand";
		
		// wait to change state go to new view
		$timeout(function(){
			$scope.property.animatedNew = "";
			$state.go('eventmenu.news');
		}, 1000);
	};

	// go to offers
	$scope.offers = function(){
		
		// add class
		$scope.property.animatedOffer = "rubberBand";
		
		// wait to change state go to offer view
		$timeout(function(){
			$scope.property.animatedOffer = "";
			$state.go('eventmenu.offers');
		}, 1000);
	};

	// go to clients
	$scope.clients = function(){
		
		// add class
		$scope.property.animatedClient = "rubberBand";

		// if the client i logged in redirect directly to dashboard
		if(window.localStorage.getItem("username") !== null && 
		   window.localStorage.getItem("password") !== null) {
        	
			// wait to change state go to client view
			$timeout(function(){
				$scope.property.animatedClient = "";
				$state.go('eventmenu.client', { "user": window.localStorage.getItem("username") });
			}, 1000);
			
        } else {
        
		    // wait to change state go to client view
			$timeout(function(){
				$scope.property.animatedClient = "";
				$state.go('eventmenu.login');
			}, 1000);
        }
	};

	// go to articles
	$scope.articles = function(){
		
		// add class
		$scope.property.animatedArticle = "rubberBand";
		
		// wait to change state go to article view
		$timeout(function(){
			$scope.property.animatedArticle = "";	
			$state.go('eventmenu.articles');
		}, 1000);
	};

	// go to shops
	$scope.shops = function(){
		
		// add class
		$scope.property.animatedShop = "rubberBand";
		
		// wait to change state go to shop view
		$timeout(function(){
			$scope.property.animatedShop = "";
			$state.go('eventmenu.shops');
		}, 1000);
	};
})


/**
 * Dashboard Controller
 */
.controller('DashBoardBonusController', function($timeout, $ionicPopover, $ionicHistory, $scope, $state, $ionicViewSwitcher, $ionicSideMenuDelegate){

})



/**
 * _Events Controller
 */



/**
 * Events Controller
 */
.controller('EventsController', function($scope, $state, $http, API, $ionicLoading){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
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
			
			if (!data.length) $scope.showEmpty = true;
			else $scope.showEmpty = false;
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
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
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {

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
			
			if (!data.length) $scope.showEmpty = true;
			else $scope.showEmpty = false;
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
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
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {

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

	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/cowicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			duration: 2000,
			noBackdrop: true
		});
	
    });
	
	// go to offers's details
	$scope.offerDetails = function(){
		$state.go('eventmenu.offerDetails');
	};

	// create offer manually, later we will 
	// change with the data API provider
	var offers = [];
	
	/*for (i = 1; i < 100; i++) { 
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
	}*/
	
	if (!offers.length) $scope.showEmpty = true;
	else $scope.showEmpty = false;

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
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
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
			
			if (!data.length) $scope.showEmpty = true;
			else $scope.showEmpty = false;
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
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

	// open new url in the native browser using cordoba plugin
	$scope.openURL = function() {
		window.open($scope.new.Enlace, '_system');
	}

	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {

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
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
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
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {

		// setup the loader and show spinner
		// remove
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
		var article = $scope.articlesOutlet[index];
		$state.go('eventmenu.articleDetails', {"codigo" : article.Codigo});
	};
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
		
		// Access to the articles top calling service 
		API.getArticles('TOP').success( function (data){

			// pass to events binding adn hiden loading
			$scope.articlesTop = data;
			
			// hide wait element when the first service finished to load articles top
			$ionicLoading.hide();
			
			if (!data.length) $scope.showTopEmpty = true;
			else $scope.showTopEmpty = false;
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
			$ionicLoading.hide();
		});
		
		// Access to the articles outlet calling service 
		API.getArticles('OUT').success( function (data){
			$scope.articlesOutlet = data;

			if (!data.length) $scope.showOutletEmpty = true;
			else $scope.showOutletEmpty = false;
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
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
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
	
		// Get all families calling service
		API.getFamilies().success( function (data){

			// pass to articles binding adn hiden loading
			$scope.families = data;
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
			$ionicLoading.hide();
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
			
			// go to search result
			$state.go('eventmenu.articlesSearchResult', {"filtro" : filter});
		}
	}
})


/**
 * Articles Search Result Controller
 */
.controller('ArticlesSearchResultController', function(
	$scope, $ionicScrollDelegate, $stateParams, $state, $http, API, 
    $ionicLoading, $ionicModal, $ionicPlatform, $rootScope, $ionicHistory){
	
	var init, filter;

	// initialize the articles list
	$scope.articles = [];
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {

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
			})
			.error( function( data, status ){
				$state.go('eventmenu.error');
				$ionicLoading.hide();
			});
		}else{
            $ionicLoading.hide();   
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
		})		
		.error( function( data, status ){
			$state.go('eventmenu.error');
			$ionicLoading.hide();
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
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {

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
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
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
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
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
			
			if (!data.length) $scope.showEmpty = true;
			else $scope.showEmpty = false;
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
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
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {

		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/pinkicon.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
    // open new url in the native browser using cordoba plugin
	$scope.openURL = function() {
		window.open('http://' + $scope.shop.Web, '_system');
	}
    
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
				
		// Access to the event calling service using the code 
		API.getShopById($stateParams.id).success( function (data){
		   
			// pass to events binding and hidden loading
			$scope.shop = data;
			$ionicLoading.hide();
		})
		.error( function( data, status ){
			$ionicLoading.hide();
			$state.go('eventmenu.error');
		});
    });	

	// go to event's map
	$scope.shopMap = function(){
		$state.go('eventmenu.shopMap', { "coordenadas": $scope.shop.Coordenadas });
	};
	
	// call telephone
  	$scope.call = function (){
  		document.location.href = 'tel:+34' + $scope.shop.Telefono;
  	}
})


/**
 * Shop Map Controller
 */
.controller('ShopMapController', function($scope, $stateParams, $state, $ionicLoading){

	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {

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
 * Login Controller
 */
.controller('ClientLoginController', function($scope, $state, API, $stateParams, $ionicHistory){
  
  	// init var to take personal details & error message 
  	$scope.personalDetails = {};
	$scope.errorMessage = "";
	$scope.errorMessageClass = "displayNone";
	  
	// Go to Client Register View
	$scope.register = function(){
		
		// disable transition
		$ionicHistory.nextViewOptions({
			disableAnimate: true
		});
		
		$state.go('eventmenu.clientRegister');
	}	
    
    // Recovery password using client's email
    $scope.recovery = function (){
        $state.go('eventmenu.recovery');
    }
	
	// Go to Client View
	$scope.login = function( form ){
		
		// validate form
		if(form.$valid) {
			
			// Access to the event calling service using the code 
			API.getClientLogin($scope.personalDetails.user, $scope.personalDetails.password).success( function (data){
	
				// check if the client and password exist
				if (data == "-1"){
					
					// user does not exist
					$scope.errorMessage = "* El usuario no existe";
					$scope.errorMessageClass = "displayBlock";
					
				}else if(data == "-2"){
					
					// password incorrect
					$scope.errorMessage = "* La contraseña es incorrecta";
					$scope.errorMessageClass = "displayBlock";
					
				}else{
					
					// disable transition
					$ionicHistory.nextViewOptions({
						disableAnimate: true
					});
					
					// save data in local storage
					window.localStorage.setItem("username", $scope.personalDetails.user);
        			window.localStorage.setItem("password", $scope.personalDetails.password);
					
					// if exist redirect to client dashboard
					$state.go('eventmenu.client', { "user": $scope.personalDetails.user });
				}
			})
			.error( function( data, status ){
				$state.go('eventmenu.error');
			});
		}
	}
})


/**
 * Client Controller
 */
.controller('ClientController', function(    
    $scope, $state, $ionicPlatform, $ionicHistory, 
    $ionicLoading, $stateParams, API, $ionicPopover, 
    $cordovaDevice, $cordovaFile, ImageService, FileService)
{	            
	// this var is for change style when
	// the client has not code
	$scope.hasCode = false;
	
	$ionicPopover.fromTemplateUrl('templates/ClientPopoverView.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});

  	// logout function
	$scope.logout = function(){
		
		// remove popoup before to change the state
		$scope.popover.remove();
		
		// disable transition
		$ionicHistory.nextViewOptions({
			disableAnimate: true
		});
		
		// remove localstorage
		window.localStorage.removeItem("username");
        window.localStorage.removeItem("password");
		
		$state.go('eventmenu.login'); 
	}
    
    // settings function
	$scope.settings = function(){
		
		// remove popoup before to change the state
		$scope.popover.remove();
        
        // go to settings view
		$state.go('eventmenu.settings', { "user" : $scope.client.Usuario }); 
	}
  
	// go to barcode view
	$scope.barcode = function(){
		$state.go('eventmenu.barcode', {  "user" : $scope.client.Usuario }); 
	};
	
	// go to purchases view
	$scope.purchases = function(){
		$state.go('eventmenu.purchases', {  "code" : $scope.client.Codigo });  
	};
	
	// go to points view
	$scope.points = function(){
		$state.go('eventmenu.points', { "code" : $scope.client.Codigo });  
	};
	
	// go to messages view
	$scope.messages = function(){
		$state.go('eventmenu.messages');  
	};
	
    // when ionic view is completly load
    $ionicPlatform.ready(function() {  
             
        // if the client has not image profile load in localstorage the default image
		if(window.localStorage.getItem("profile-image") == null){
            $scope.image = "img/emptyuser.png";                                        
        }else{
            $scope.image = "data:image/jpeg;base64," + FileService.profileImage();
        }            
    });
            
	// load cliente date before to render view
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {

		// Access to the event calling service using the code 
		API.getClientByUser($stateParams.user).success( function (data){       

			// if the account hasnt been enable we add inactive message
			if (data == null){
				
                // if client is empty we need to inizializate client 
                // if we want to add some params into binding
                $scope.client = [];               
                $scope.client.Codigo = "SIN ACTIVAR";        
				$scope.hasCode = true;
                
			}else{             			
                // pass to events binding and hidden loading
                $scope.client = data;
            }
		});
    });
})


/**
 * Client Settings Controller
 */
.controller('ClientSettingsController', function($scope, $state, $stateParams, API, $ionicLoading){
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/osito.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
            duration: 2000,
			noBackdrop: true
		});
    });
    
    // got to change password view
	$scope.password = function(form){		
        $state.go('eventmenu.password', $stateParams.user );         
    }
    
    // got to change password view
	$scope.profile = function(form){		
        $state.go('eventmenu.profile', $stateParams.user );         
    }
})


/**
 * Client Profile Controller
 */
.controller('ClientProfileController', function(
    $scope, $state, $stateParams, API, $ionicLoading,
    $jrCrop, $ionicPlatform, $ionicActionSheet,$q,
    $cordovaDevice, $cordovaFile, ImageService, FileService )
{
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/osito.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
            duration: 2000,
			noBackdrop: true
		});
    });
                  
    // if the client has not image profile load in localstorage the default image
    if(window.localStorage.getItem("profile-image") == null){
        $scope.image = "img/emptyuser.png";                                           	                                
    }else{
        $scope.image = "data:image/jpeg;base64," + FileService.profileImage();
    }    
        
    // load view to select picture or take picture
    $scope.addMedia = function() {
        $scope.hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<div class="optionsPicture"><i class="ion-android-camera iOptions"></i>Sacar Foto</div>' },
                { text: '<div class="optionsPicture"><i class="ion-image iOptions"></i>Foto de la galería</div>' }
            ],
            titleText: 'Añadir imagen',
            cancelText: 'Cancelar',
            buttonClicked: function(index) {
                $scope.addImage(index);
            }
        });
    } 
    
    // delete image
    $scope.deleteMedia = function(){
        
        // remove localstorage and insert new one
		window.localStorage.removeItem('profile-image'); 
        
        // add empty user                
        $scope.image = "img/emptyuser.png";
    }           
    
    // add new image into profile image
    $scope.addImage = function(type) {       
        $scope.hideSheet();
        
        // save image to later crop
        ImageService.handleMediaDialog(type).then(function(data) {                       	                           
            var noCropImage; 
            
            //  control if the user has profile image                            
            if(window.localStorage.getItem("profile-image") == null){
                noCropImage = "img/emptyuser.png";                                           	                                
            }else{
                noCropImage = "data:image/jpeg;base64," + FileService.profileImage();
            }  
              
            // crop image       
            $jrCrop.crop({
                url: noCropImage,
                width: 200,
                height: 200,
                circle: true
            }).then(function(canvas) {
                
                // success, we need to save the cropping image!                
                $scope.image = canvas.toDataURL();
                
                // slice string to save without base64 
                FileService.storeProfileImage(
                    $scope.image.slice($scope.image.indexOf(',') + 1)
                );            
                
            }, function() {
                
                // if user cancel save actual image
                FileService.storeProfileImage( 
                    $scope.image.slice($scope.image.indexOf(',') + 1)
                );   
            });                                                       
        })
        .catch(function(err) {
            console.log ('error');
        })             
    }      
})


/**
 * Client ChangePassword Controller
 */
.controller('ClientChangePasswordController', function($scope, $state, $stateParams, API, $ionicLoading){
	
    $scope.personalDetails = {};
    $scope.showError = false;
    
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/osito.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
            duration: 2000,
			noBackdrop: true
		});
    });
    
    // Check is the form is validation and change
    // password using API rest
	$scope.changePassword = function(form){
		
        if(form.$valid) {
            
            // check if the passwords are equals
            if ($scope.personalDetails.newPassword == $scope.personalDetails.confirmPassword) { 
                
                // Call Api resource to change password client
                API.changePass($stateParams.user, $scope.personalDetails.newPassword).success( function (data){
                    
                    // if 0 everything is correct
                    if (data == 0) 
                         $state.go('eventmenu.successfullyChangePass');
                })
                .error( function( data, status ){
                    $state.go('eventmenu.error');
                    $ionicLoading.hide();
                });
           }
            else{
                $scope.showError = true;
            }
        }
    }
})


/**
 * Client Recovery Controller
 */
.controller('ClientRecoveryController', function($scope, $state, $stateParams, API, $ionicLoading){
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/osito.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
            duration: 2000,
			noBackdrop: true
		});
    });
    
    // Check is the form is validation and change
    // password using API rest
	$scope.recoveryPassword = function(form){
		
        if(form.$valid) { 
            
            // Call Api resource to change password client
            API.recoveryPass($scope.personalDetails.email).success( function (data){
                
                // if 0 everything is correct
                if (data == 0) {
                    $state.go('eventmenu.successfullyRecovery');
                }else {
                    $scope.showError = true;
                } 
            })
            .error( function( data, status ){
                $state.go('eventmenu.error');
                $ionicLoading.hide();
            });                                   
        }
    }
})


/**
 * Client Barcode Controller
 */
.controller('ClientBarCodeController', function($scope, $state, $stateParams, API, $ionicLoading){
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/osito.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// load cliente date before to render view
	$scope.$on('$ionicView.enter', function (viewInfo, state) {

		// Access to the event calling service using the code 
		API.getClientByUser($stateParams.user).success( function (data){

			// if the account hasnt been enable we add inactive message
			if (data.Codigo == ""){
				data.Codigo = "SIN ACTIVAR";
				$scope.hasCode = true;
			}
			
			// pass to events binding and hidden loading
			$scope.client = data;
			$ionicLoading.hide();
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
			$ionicLoading.hide();
		});
    });
})


/**
 * Client Purchases Controller
 */
.controller('ClientPurchasesController', function($scope, $state, $ionicLoading, API, $stateParams){
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/osito.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
			
		// Access to the event calling service 
		API.getClientPurchase($stateParams.code).success( function (data){
			
			// pass to purchase binding adn hiden loading
			$scope.purchases = data.reverse();
			$ionicLoading.hide();
			
			if (!data.length) $scope.showEmpty = true;
			else $scope.showEmpty = false;
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
			$ionicLoading.hide();
		});
    });
	
	// go to purchases details
	$scope.purchaseDetails = function(purchase){
		$state.go('eventmenu.purchaseDetails', {  "purchase" : purchase });  
	};
})


/**
 * Client Purchase Details Controller
 */
.controller('PurchaseDetailsController', function($scope, $state, $ionicLoading, API, $stateParams){
	
	// go to article details view
	$scope.articleDetails = function(code){
		$state.go('eventmenu.purchaseArticleDetails', { "article" : code });  
	};
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/osito.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
			
		// Access to the articles in purchase 
		API.getClientPurchaseDetails($stateParams.purchase).success( function (data){
			
			// pass to articles binding adn hiden loading
			$scope.purchase = data;
			$scope.articles = data.Articulos;
			$ionicLoading.hide();
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
			$ionicLoading.hide();
		});
    });
})


/**
 * Client Article Purchase Details Controller
 */
.controller('PurchaseArticleDetailsController', function($scope, $state, $ionicLoading, API, $stateParams){
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/osito.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	$scope.$on('$ionicView.enter', function (viewInfo, state) {

		// Access to the event calling service using the code 
		API.getArticleByCode($stateParams.article).success( function (data){
			
			// pass to events binding and hidden loading
			$scope.article = data;
			$ionicLoading.hide();
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
			$ionicLoading.hide();
		});
    });	
})


/**
 * Client Points Controller
 */
.controller('ClientPointsController', function($scope, $state, $ionicLoading, API, $stateParams){
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
		
		// setup the loader and show spinner
		$ionicLoading.show({
			template:'<img src="img/osito.png"></img><br/><ion-spinner icon="dots" class="spinner-dark"></ion-spinner>',
			noBackdrop: true
		});
    });
	
	// Make actions when the view be loaded
	$scope.$on('$ionicView.enter', function (viewInfo, state) {
			
		// Access to the articles in purchase 
		API.getClientPoints($stateParams.code).success( function (data){
			
			// pass to articles binding adn hiden loading
			$scope.points = data;
			$ionicLoading.hide();
            
            if (!data.length) $scope.showEmpty = true;
			else $scope.showEmpty = false;
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');
			$ionicLoading.hide();
		});
    });
})


/**
 * Client Messages Controller
 */
.controller('ClientMessagesController', function($scope, $state){
	
})


/**
 * Client Successfully Controller
 */
.controller('ClientSuccessfullyController', function($scope, $state, $timeout, $ionicLoading, $stateParams){	
				
	// do action when pass 5 seconds, redirect client view 
	$timeout(function() {
     	$state.go('eventmenu.client', { "user": $stateParams.user });
    }, 5000);
})


/**
 * Client Successfully Recovery Controller
 */
.controller('ClientSuccessfullyRecoveryController', function($scope, $state, $timeout, $ionicLoading, $stateParams){	
				
	// do action when pass 5 seconds, redirect client view 
	$timeout(function() {
     	$state.go('eventmenu.login');
    }, 5000);
})


/**
 * Client Successfully ChangePass Controller
 */
.controller('ClientSuccessfullyChangePassController', function($scope, $state, $timeout, $ionicLoading, $stateParams){	
				
	// do action when pass 5 seconds, redirect client view 
	$timeout(function() {
     	$state.go('eventmenu.login');
    }, 5000);
})


/**
 * Client Register Controller
 */
.controller('ClientRegisterController', function($scope, $state, $ionicTabsDelegate, API, $ionicLoading){

	// init var to take personaldetails & disable variable  
  	$scope.personalDetails = {};
  	$scope.disableTab2 = true;
	$scope.disableTab3 = true;
  
    // load states in to view       
    $scope.states = [{"id_provincia":"2","provincia":"Albacete"}, {"id_provincia":"3","provincia":"Alicante\/Alacant"}, {"id_provincia":"4","provincia":"Almer\u00eda"}, {"id_provincia":"1","provincia":"Araba\/\u00c1lava"}, {"id_provincia":"33","provincia":"Asturias"}, {"id_provincia":"5","provincia":"\u00c1vila"}, {"id_provincia":"6","provincia":"Badajoz"}, {"id_provincia":"7","provincia":"Balears, Illes"}, {"id_provincia":"8","provincia":"Barcelona"}, {"id_provincia":"48","provincia":"Bizkaia"}, {"id_provincia":"9","provincia":"Burgos"}, {"id_provincia":"10","provincia":"C\u00e1ceres"}, {"id_provincia":"11","provincia":"C\u00e1diz"}, {"id_provincia":"39","provincia":"Cantabria"}, {"id_provincia":"12","provincia":"Castell\u00f3n\/Castell\u00f3"}, {"id_provincia":"51","provincia":"Ceuta"}, {"id_provincia":"13","provincia":"Ciudad Real"}, {"id_provincia":"14","provincia":"C\u00f3rdoba"}, {"id_provincia":"15","provincia":"Coru\u00f1a, A"}, {"id_provincia":"16","provincia":"Cuenca"}, {"id_provincia":"20","provincia":"Gipuzkoa"}, {"id_provincia":"17","provincia":"Girona"}, {"id_provincia":"18","provincia":"Granada"}, {"id_provincia":"19","provincia":"Guadalajara"}, {"id_provincia":"21","provincia":"Huelva"}, {"id_provincia":"22","provincia":"Huesca"}, {"id_provincia":"23","provincia":"Ja\u00e9n"}, {"id_provincia":"24","provincia":"Le\u00f3n"}, {"id_provincia":"27","provincia":"Lugo"}, {"id_provincia":"25","provincia":"Lleida"}, {"id_provincia":"28","provincia":"Madrid"}, {"id_provincia":"29","provincia":"M\u00e1laga"}, {"id_provincia":"52","provincia":"Melilla"}, {"id_provincia":"30","provincia":"Murcia"}, {"id_provincia":"31","provincia":"Navarra"}, {"id_provincia":"32","provincia":"Ourense"}, {"id_provincia":"34","provincia":"Palencia"}, {"id_provincia":"35","provincia":"Palmas, Las"}, {"id_provincia":"36","provincia":"Pontevedra"}, {"id_provincia":"26","provincia":"Rioja, La"}, {"id_provincia":"37","provincia":"Salamanca"}, {"id_provincia":"38","provincia":"Santa Cruz de Tenerife"}, {"id_provincia":"40","provincia":"Segovia"}, {"id_provincia":"41","provincia":"Sevilla"}, {"id_provincia":"42","provincia":"Soria"}, {"id_provincia":"43","provincia":"Tarragona"}, {"id_provincia":"44","provincia":"Teruel"}, {"id_provincia":"45","provincia":"Toledo"}, {"id_provincia":"46","provincia":"Valencia\/Val\u00e8ncia"}, {"id_provincia":"47","provincia":"Valladolid"}, {"id_provincia":"49","provincia":"Zamora"}, {"id_provincia":"50","provincia":"Zaragoza"}];                      
        
    // load locations  
    $scope.loadLocations = function (id_provincia){
        
        // call API to load location using the id of province             
		API.getLocations(id_provincia).success( function (data){
            
			// pass to articles binding adn hiden loading
			$scope.locations = data;			
		})
		.error( function( data, status ){
			$state.go('eventmenu.error');		
		});
    }  
       
  	// check for to control details
	$scope.checkDetails = function(form){
		
		// validate form and redirect to second tab
		if(form.$valid) {
			$ionicTabsDelegate.select(1);
			$scope.disableTab2 = false;
		}
	}
        	     
	// Change to third tab
	$scope.changeTab = function(){
		$ionicTabsDelegate.select(2);
		$scope.disableTab3 = false;
	}
	
	// Check acces information and register user if all information 
	// has been completed
	$scope.checkAccess = function(form){

		// validate form
		if(form.$valid) {			           
            
			// new client
			var newClient = 
			{ 
				'Nombre' : $scope.personalDetails.name,
				'Apellidos': $scope.personalDetails.surname,
				'Nif': $scope.personalDetails.nif,
				'Nacimiento': $scope.personalDetails.date,
				'Email': $scope.personalDetails.email,
				'Telefono': $scope.personalDetails.telephone,
				'Direccion': $scope.personalDetails.address,
				'Localidad': $scope.personalDetails.location.Descripcion,
				'Provincia': $scope.personalDetails.state.provincia,
				'CP': $scope.personalDetails.cp,
				'Pais': $scope.personalDetails.country,
				'Usuario': $scope.personalDetails.user,
				'Password': $scope.personalDetails.password,
				'Codigo': $scope.personalDetails.code
			}	
			
            
			// Call Api resource to add client
			API.addClient(newClient).success( function (data){
				
				// client does not exist and register correctly
				if (data == 0) 
					$state.go('eventmenu.successfully', { "user": $scope.personalDetails.user });
			})
			.error( function( data, status ){
				$state.go('eventmenu.error');
				$ionicLoading.hide();
			});
		}
	}
})



/**
 * _Menu Controller
 */



/**
 * Menu Controller
 */
.controller('MenuController', function($scope, $state, $timeout){
	
	// open facebook
	$scope.openFacebook = function (){
		window.open('https://www.facebook.com/jugueteriaslifer', '_system');
	};
	
	// open twitter
	$scope.openTwitter = function (){
		window.open('https://twitter.com/jugueterialifer', '_system');
	};
	
	// open youtube
	$scope.openYoutube = function (){
		window.open('https://www.youtube.com/user/jugueteriaslifer1', '_system');
	};
	
	// go to clients
	$scope.clients = function(){
		
		// if the client i logged in redirect directly to dashboard
		if(window.localStorage.getItem("username") !== null && 
		   window.localStorage.getItem("password") !== null) {
			$state.go('eventmenu.client', { "user": window.localStorage.getItem("username") });
        } else {
			$state.go('eventmenu.login');
        }
	};
})



/**
 * _Content Controller
 */



/**
 * Content Controller
 */
.controller('ContentController', function($scope, $state){
	
})

