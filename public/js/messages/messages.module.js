(function(){
	'use strict';
	angular
		.module('app.routes.messages', [])
		.config(config);

	config.$inject = ['$stateProvider', '$httpProvider'];

	function config($stateProvider, $httpProvider){
		$httpProvider.defaults.headers.post = {};
		$stateProvider
			.state('messages', {
				url: "/messages",
				templateUrl: "/js/messages/templates/index.html",
				controller: 'MessagesController',
				controllerAs: 'vm',
			})
			
			.state('messages.new',{
				url: "/new/:id",
				templateUrl: "/js/messages/templates/new.html",
				controller: 'MessagesNewController',
				controllerAs: 'vm',
			})
	}
})();
