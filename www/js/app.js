// Ionic liferapp
angular.module('liferapp', ['ionic', 'liferapp.controllers', 'uiGmapgoogle-maps'])

// Run
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // ionic is loaded
  });
})

// Config
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) { 

  // disable animation between pages
  $ionicConfigProvider.views.transition('none');
  
  // set state to navigation 
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
      url: "/eventDetails",
      views: {
        'menuContent' :{
          templateUrl: "templates/EventDetailsView.html",
          controller: "EventDetailsController"
        }
      }
    })

    // Create state to event map view
    .state('eventmenu.eventMap', {
      url: "/eventMap",
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
      url: "/newDetails",
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
      url: "/articleDetails",
      views: {
        'menuContent' :{
          templateUrl: "templates/ArticleDetailsView.html",
          controller: "ArticleDetailsController"
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
      url: "/shopDetails",
      views: {
        'menuContent' :{
          templateUrl: "templates/ShopDetailsView.html",
          controller: "ShopDetailsController"
        }
      }
    }); 

  // By default launch dashboard view in to event view
  $urlRouterProvider.otherwise('/event/dashboard');
});