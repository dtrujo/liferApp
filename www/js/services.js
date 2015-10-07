angular.module('liferapp.services', [])
	.factory('API', function($http) {

		// API directions 
		var urlBase = 'http://213.4.39.205/webapilinkios/api';

		// return diferent methods
		return{
			getEvents : function() {
				return $http({
					url: urlBase + '/eventos',
					method: 'GET'
				})
			},
			getNews: function() {
				return $http({
					url: urlBase + '/noticias',
					method: 'GET'
				})
			},
			getArticles: function() {
				return $http({
					url: urlBase + '/articulos/movil',
					method: 'GET'
				})
			},
			getTiendas: function() {
				return $http({
					url: urlBase + '/tiendas',
					method: 'GET'
				})
			} 
		}
	});