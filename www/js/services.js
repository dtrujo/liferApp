angular.module('liferapp.services', [])
	.factory('API', function($http) {

		// API directions 
		var urlBase = 'http://213.97.238.120/webapilinkios/api';

		// return diferent methods
		return{
            getLocations : function(idProvincia) {
				return $http({
					url: urlBase + '/clientes?CodProvince=' + idProvincia,
					method: 'GET'
				})	
			},
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
			getArticles: function(ArticleType) {
				return $http({
					url: urlBase + '/articulos?ArticleType=' + ArticleType,
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
			},
			addClient: function(client) {
				return $http({
					url: urlBase + '/clientes',
					method: 'POST',
					data: client
				})
			},
            recoveryPass: function(email) {
				return $http({
					url: urlBase + '/clientes?UserEmail=' + email,
					method: 'POST',
                    data: { UserEmail: email }
				})
			},
            changePass: function(user, password) {
				return $http({
					url: urlBase + '/clientes?UserPass=' + user + '&DatPassWord=' + password,
					method: 'POST',
                    data: { UserPass: user, DatPassWord: password }
				})
			},
			getClientByUser: function(user) {
				return $http({
					url: urlBase + '/clientes?User=' + user,
					method: 'GET'
				})
			},
			getClientLogin: function(user, password) {
				return $http({
					url: urlBase + '/clientes?User=' + user + '&PassWord=' + password,
					method: 'GET'
				})
			},  
			getClientPurchase: function(code) {
				return $http({
					url: urlBase + '/compras?Codigo=' + code,
					method: 'GET'
				})
			},
			getClientPurchaseDetails: function(doc) {
				return $http({
					url: urlBase + '/compras?NumeroDocumento=' + doc,
					method: 'GET'
				})
			},
			getClientPoints: function(code) {
				return $http({
					url: urlBase + '/compras?CodigoUsuario=' + code,
					method: 'GET'
				})
			}    
		}
});