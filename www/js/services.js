angular.module('liferapp.services', [])
	.factory('API', function($http) {

		// API directions 
		var urlBase = 'http://83.36.56.136/webapilinkios/api';

		// return diferent methods
		return{
			getEvents : function() {
				return $http({
					url: urlBase + '/eventos',
					method: 'GET'
				})
			},
			getEventById : function(Id) {
				return $http({
					url: urlBase + '/eventos?Id=' + Id,
					method: 'GET'
				})	
			},
			getNews: function() {
				return $http({
					url: urlBase + '/noticias',
					method: 'GET'
				})
			},
			getNewById : function(Id) {
				return $http({
					url: urlBase + '/noticias?Id=' + Id,
					method: 'GET'
				})	
			},
			getArticles: function() {
				return $http({
					url: urlBase + '/articulos/movil',
					method: 'GET'
				})
			},
			getShops: function() {
				return $http({
					url: urlBase + '/tiendas',
					method: 'GET'
				})
			},
			getShopById: function(Id) {
				return $http({
					url: urlBase + '/tiendas?Id=' + Id,
					method: 'GET'
				})
			} 
		}
});