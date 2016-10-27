angular.module('liferapp.services', [])
	.factory('API', function($http) {

		// API directions
		var urlBase = 'http://194.140.149.253/webapilinkios/api';

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
			},
			getClientOrders: function(code) {
				return $http({
					url: urlBase + '/pedidos?PedidosCodigoCliente=' + code,
					method: 'GET'
				})
			},
			getOrderDetails: function(code) {
				return $http({
					url: urlBase + '/pedidos?NumeroPedidoGeneral=' + code,
					method: 'GET'
				})
			},
			sendOrder: function(order) {
				return $http({
					url: urlBase + '/pedidos',
					method: 'POST',
					data: order
				})
			}
		}
})

// service to control image profile
.factory('FileService', function() {
    var images;
    var IMAGE_STORAGE_KEY = 'dav-images';
    var PROFILE_IMAGE_STORAGE_KEY = 'profile-image';

    // get all image in local storage
    function getImages() {
        var img = window.localStorage.getItem(IMAGE_STORAGE_KEY);
        if (img) {
            images = JSON.parse(img);
        } else {
            images = [];
        }
        return images;
    };

    // get image profile taking local storage
    function getProfileImage() {
        var img = window.localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY);
        if (img) {
            return img;
        } else {
            return '';
        }
    };

    // save image in local storage
    function addImage(img) {
        images.push(img);
        window.localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images));
    };

    // save image in local storage
    function addProfileImage(img) {

        // remove localstorage and insert new one
		window.localStorage.removeItem(PROFILE_IMAGE_STORAGE_KEY);

        // save new image
        try {
            window.localStorage.setItem('profile-image', img);
        }catch (error) {
            console.log( 'error Liferapp: ' + error );
        }

        return true;
    };

    // return functions
    return {
        storeImage: addImage,
        storeProfileImage: addProfileImage,
        images: getImages,
        profileImage: getProfileImage
    }
})

// Service to control profile
.factory('ImageService', function($cordovaCamera, FileService, $q, $cordovaFile) {

    // take options to save image
    function optionsForType (type) {
        var source;
        switch (type) {
            case 0:
                source = Camera.PictureSourceType.CAMERA;
                break;
            case 1:
                source = Camera.PictureSourceType.PHOTOLIBRARY;
                break;
        }
        return {
            quality: 90,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: source,
            allowEdit: false,
            targetWidth: 1000,
            targetHeight: 1000,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation:false
        };
    };

    // save media using ayncronous method
    function saveMedia(type) {
        var defered = $q.defer();
        var promise = defered.promise;
        var options = optionsForType(type);

        // get image of camera or using gallery
        $cordovaCamera.getPicture(options).then(function(imageBase64) {

             // save picture in to local storage
            FileService.storeProfileImage(imageBase64);

            // return correct value using promise
            defered.resolve(FileService.profileImage());
        });

        return promise;
    };

    // return functions call
    return {
         handleMediaDialog : saveMedia
    }
});
