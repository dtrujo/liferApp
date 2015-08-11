angular.module('liferapp.services', [])
	.factory('Events', function($http) {

		// API directions 
		var urlBase = 'http://213.4.39.205/webapilinkios/api';

		// return diferent methods
		return{
			getEvents : function() {
				return $http({
					url: urlBase + '/eventos',
					method: 'GET'
				})
			}
		}
	});