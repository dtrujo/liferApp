// Ionic liferapp
angular.module('liferapp', ['ionic', 'liferapp.controllers', 'uiGmapgoogle-maps', 'liferapp.services'])

// Run
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    });
})

// Config
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) { 

    // disable animation between pages
    $ionicConfigProvider.views.transition('platform');

    // navigation
    $stateProvider

    // State to control when the event menu has been fired
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/MenuView.html"
    })

    // Parent menu call dashboard view
    .state('eventmenu.dashboard', {
      url: "/dashboard",
      views: {
        'menuContent' :{
          templateUrl: "templates/DashBoardView.html",
          controller: "DashboardController"
        }
      }
    })

    // Create state to events view
    .state('eventmenu.events', {
      url: "/events",
      views: {
        'menuContent' :{
          templateUrl: "templates/EventsView.html",
          controller: "EventsController"
        }
      }
    })
    
     // Create state to event details view
    .state('eventmenu.eventDetails', {
      url: "/eventDetails/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/EventDetailsView.html",
          controller: "EventDetailsController"
        }
      }
    })

    // Create state to event map view
    .state('eventmenu.eventMap', {
      url: "/eventMap/:coordenadas",
      views: {
        'menuContent' :{
          templateUrl: "templates/EventMapView.html",
          controller: "EventMapController"
        }
      }
    })

    // Create state to offers view
    .state('eventmenu.offers', {
      url: "/offers",
      views: {
        'menuContent' :{
          templateUrl: "templates/OffersView.html",
          controller: "OffersController"
        }
      }
    }) 

    // Create state to offer details view
    .state('eventmenu.offerDetails', {
      url: "/offerDetails",
      views: {
        'menuContent' :{
          templateUrl: "templates/OfferDetailsView.html",
          controller: "OfferDetailsController"
        }
      }
    })   

    // Create state to news view
    .state('eventmenu.news', {
      url: "/news",
      views: {
        'menuContent' :{
          templateUrl: "templates/NewsView.html",
          controller: "NewsController"
        }
      }
    })  

    // Create state to new details view
    .state('eventmenu.newDetails', {
      url: "/newDetails/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/NewDetailsView.html",
          controller: "NewDetailsController"
        }
      }
    }) 

    // Create state to articles view
    .state('eventmenu.articles', {
      url: "/articles",
      views: {
        'menuContent' :{
          templateUrl: "templates/ArticlesView.html",
          controller: "ArticlesController"
        }
      }
    }) 

    // Create state to article details view
    .state('eventmenu.articleDetails', {
      url: "/articleDetails/:codigo",
      views: {
        'menuContent' :{
          templateUrl: "templates/ArticleDetailsView.html",
          controller: "ArticleDetailsController"
        }
      }
    }) 
   
    // Create state to articles search result view
    .state('eventmenu.articlesSearchResult', {
      url: "/articlesSearchResult/:filtro",
      views: {
        'menuContent' :{
          templateUrl: "templates/ArticlesSearchResultView.html",
          controller: "ArticlesSearchResultController"
        }
      }
    })
    
    // Create state to article search view
    .state('eventmenu.articlesSearch', {
      url: "/articlesSearch",
      views: {
        'menuContent' :{
          templateUrl: "templates/ArticlesSearchView.html",
          controller: "ArticlesSearchController"
        }
      }
    }) 

    // Create state to clients view
    .state('eventmenu.clients', {
      url: "/clients",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientsView.html",
          controller: "ClientsController"
        }
      }
    }) 

    // Create state to shops view
    .state('eventmenu.shops', {
      url: "/shops",
      views: {
        'menuContent' :{
          templateUrl: "templates/ShopsView.html",
          controller: "ShopsController"
        }
      }
    })

    // Create state to shops details view
    .state('eventmenu.shopDetails', {
      url: "/shopDetails/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/ShopDetailsView.html",
          controller: "ShopDetailsController"
        }
      }
    })
    
    // Create state to shops Map view
    .state('eventmenu.shopMap', {
      url: "/shopMap/:coordenadas",
      views: {
        'menuContent' :{
          templateUrl: "templates/ShopMapView.html",
          controller: "ShopMapController"
        }
      }
    });

    // By default launch dashboard view in to event view
    $urlRouterProvider.otherwise('/event/dashboard');
});