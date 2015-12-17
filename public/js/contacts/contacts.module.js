(function(){
	'use strict';
	angular
		.module('app.routes.contacts', [])
		.config(config);

	config.$inject = ['$stateProvider'];

	function config($stateProvider){
		$stateProvider
			.state('contacts', {
				url: "/contacts",
				templateUrl: "/js/contacts/templates/index.html",
				controller: 'ContactsController',
				controllerAs: 'vm',
				resolve:{
					contactsPromise: ['contact', function(contact){
						return contact.getAll();
					}]
				}
			})
			
			.state('contacts.new',{
				url: "/new/:id",
				templateUrl: "/js/contacts/templates/new.html",
				controller: 'ContactsNewController',
				controllerAs: 'vm',
			})
	}
})();
