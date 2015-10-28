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
			getFamilies: function() {
				return $http({
					url: urlBase + '/familias',
					method: 'GET'
				})
			},			
			getArticles: function() {
				return $http({
					url: urlBase + '/articulos?topventas=20',
					method: 'GET'
				})
			},
			getArticlesByFilter : function(Filter) {
				return $http({
					url: urlBase + '/articulos?' + Filter,
					method: 'GET'
				})	
			},
			getArticleByCode : function(Codigo) {
				return $http({
					url: urlBase + '/articulos?codigo=' + Codigo,
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