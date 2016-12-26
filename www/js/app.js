// Ionic liferapp
angular.module('liferapp', ['ionic', 'jrCrop', 'ngCordova', 'liferapp.controllers', 'uiGmapgoogle-maps', 'liferapp.services', 'ngIOS9UIWebViewPatch', 'ionic-numberpicker'])

// Run
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

        //hide the status bar using the StatusBar plugin
        if(window.StatusBar) {

            // org.apache.cordova.statusbar required
            StatusBar.hide();
            ionic.Platform.fullScreen();
        }

    });
})

.service('$cordovaScreenshot', ['$q', function($q) {
    return {
        capture: function(filename, extension, quality) {
            filename = filename || 'pic';
            extension = extension || 'jpg';
            quality = quality || '100';

            var defer = $q.defer();

            navigator.screenshot.save(function(error, res) {
                if (error) {
                    console.error(error);
                    defer.reject(error);
                } else {
                    console.log('screenshot saved in: ', res.filePath);
                    defer.resolve(res.filePath);
                }
            }, extension, quality, filename);

            return defer.promise;
        }
    };
}])

// Config
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {


    // GENERAL CONFIG PARAMS


    // disable title text in the back button
    $ionicConfigProvider.backButton.previousTitleText(false);

    // change the previous text if you dont show the title back button
    $ionicConfigProvider.backButton.text('');

    // disable animation between pages
    $ionicConfigProvider.views.transition('platform');

    // Forward cache when navigate not recreate state
    $ionicConfigProvider.views.forwardCache(true)


    //  NAVIGATIONS TO STATES


    // navigation
    $stateProvider

    // State to control when the event menu has been fired
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/MenuView.html",
      controller: "MenuController"
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

    // Parent menu call dashboard bonus view
    .state('eventmenu.bonus', {
      url: "/bonus",
      views: {
        'menuContent' :{
          templateUrl: "templates/DashBoardBonusView.html"
        }
      }
    })

    // Parent menu call dashboard bonus view
    .state('eventmenu.legal', {
      url: "/legalwarning",
      views: {
        'menuContent' :{
          templateUrl: "templates/DashBoardLegalWarningView.html"
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

    // Create state to cart view
    .state('eventmenu.cart', {
      url: "/cart",
      views: {
        'menuContent' :{
          templateUrl: "templates/CartView.html",
          controller: "CartController"
        }
      }
    })

    // Create state to cart confirm view
    .state('eventmenu.cartConfirm', {
      url: "/cartConfirm",
      views: {
        'menuContent' :{
          templateUrl: "templates/CartConfirmView.html",
          controller: "CartConfirmController"
        }
      }
    })

    // Create state to cart confirm adress pickUp view
    .state('eventmenu.cartConfirmAddress', {
      url: "/cartConfirmAddress",
      views: {
        'menuContent' :{
          templateUrl: "templates/CartConfirmAddressView.html",
          controller: "CartConfirmAddressController"
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

    // Create state to login view
    .state('eventmenu.login', {
      cache: false,
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientLoginView.html",
          controller: "ClientLoginController"
        }
      }
    })

    // Create state to client view
    .state('eventmenu.client', {
      url: "/client/:user",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientView.html",
          controller: "ClientController"
        }
      }
    })

    // Create state to client change password view
    .state('eventmenu.password', {
      url: "/password/:user",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientChangePasswordView.html",
          controller: "ClientChangePasswordController"
        }
      }
    })

    // Create state to client profile view
    .state('eventmenu.profile', {
      url: "/profile/:user",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientProfileView.html",
          controller: "ClientProfileController"
        }
      }
    })

    // Create state to client settigns menu view
    .state('eventmenu.settings', {
      url: "/settings/:user",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientSettingsView.html",
          controller: "ClientSettingsController"
        }
      }
    })

    // Create state to client successfully view
    .state('eventmenu.successfully', {
      url: "/successfully/:user",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientSuccessfullyView.html",
          controller: "ClientSuccessfullyController"
        }
      }
    })

    // Create state to client successfully recovery view
    .state('eventmenu.successfullyRecovery', {
      url: "/successfullyRecovery",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientSuccessfullyRecoveryView.html",
          controller: "ClientSuccessfullyRecoveryController"
        }
      }
    })

   // Create state to client successfully change password view
    .state('eventmenu.successfullyChangePass', {
      url: "/successfullyChangePass",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientSuccessfullyChangePassView.html",
          controller: "ClientSuccessfullyChangePassController"
        }
      }
    })

    // Create state to client recovery view
    .state('eventmenu.recovery', {
      url: "/recovery",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientRecoveryView.html",
          controller: "ClientRecoveryController"
        }
      }
    })

    // Create state to barcode view
    .state('eventmenu.barcode', {
      url: "/barcode/:user",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientBarCodeView.html",
          controller: "ClientBarCodeController"
        }
      }
    })

    // Create state to purchases view
    .state('eventmenu.purchases', {
      url: "/purchases/:code",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientPurchasesView.html",
          controller: "ClientPurchasesController"
        }
      }
    })

    // Create state to purchase details view
    .state('eventmenu.selectArticleTicketPresent', {
      url: "/articleTicketPresent/:code",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientSelectArticleTicketPresent.html",
          controller: "SelectArticleTicketPresentController"
        }
      }
    })

    // Create state present ticket information
    .state('eventmenu.ticketPresent', {
      url: "/ticketPresent/:code/:articlesChecked/:date",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientTicketPresentView.html",
          controller: "ClientTicketPresentController"
        }
      }
    })

    // Create state to purchase details view
    .state('eventmenu.purchaseDetails', {
      url: "/purchaseDetails/:purchase",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientPurchaseDetailsView.html",
          controller: "PurchaseDetailsController"
        }
      }
    })

    // Create state to article purchase details view
    .state('eventmenu.purchaseArticleDetails', {
      url: "/purchaseArticleDetails/:article",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientPurchaseArticleDetailsView.html",
          controller: "PurchaseArticleDetailsController"
        }
      }
    })

    // Create state to points view
    .state('eventmenu.points', {
      url: "/points/:code",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientPointsView.html",
          controller: "ClientPointsController"
        }
      }
    })

    // Create state to orders view
    .state('eventmenu.orders', {
      url: "/orders/:code",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientOrdersView.html",
          controller: "ClientOrdersController"
        }
      }
    })

    // Create state to order success view
    .state('eventmenu.orderSuccess', {
      url: "/orderSuccess/:user",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientOrderSuccessView.html",
          controller: "ClientOrderSuccessController"
        }
      }
    })

    // Create state to order details view
    .state('eventmenu.orderDetails', {
      url: "/orderDetails/:order",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientOrderDetailsView.html",
          controller: "ClientOrderDetailsController"
        }
      }
    })

    // Create state to messages view
    .state('eventmenu.messages', {
      url: "/messages",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientMessagesView.html",
          controller: "ClientMessagesController"
        }
      }
    })

    // Create state to clients register view
    .state('eventmenu.clientRegister', {
      url: "/clientRegister",
      views: {
        'menuContent' :{
          templateUrl: "templates/ClientRegisterView.html",
          controller: "ClientRegisterController"
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
    })

    // Create state to error view
    .state('eventmenu.error', {
      url: "/error",
      views: {
        'menuContent' :{
          templateUrl: "templates/ErrorView.html"
        }
      }
    });

    // By default launch dashboard view in to event view
    $urlRouterProvider.otherwise('/event/dashboard');
});
