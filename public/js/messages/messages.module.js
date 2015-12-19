(function(){
	'use strict';
	angular
		.module('app.routes.messages', [])
		.config(config);

	config.$inject = ['$stateProvider', '$httpProvider'];

	function config($stateProvider, $httpProvider){
		$stateProvider
			.state('messages', {
				url: "/messages",
				templateUrl: "/js/messages/index.html",
				controller: 'MessagesController',
				controllerAs: 'vm',
			})

			.state('delivery',{
				url: "/delivery",
				templateUrl: "/js/messages/delivery.html",
				controller: 'DeliveryController',
				controllerAs: 'vm',
			})
	}
})();
