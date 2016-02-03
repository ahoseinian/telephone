(function(){
	'use strict';
	angular
		.module('app.routes.contacts')
		.controller('ContactsNewController', ContactsNewController);

		ContactsNewController.$inject = ['contact', '$stateParams', '$state'];
		function ContactsNewController(contact, $stateParams, $state){
			var vm = this;
			vm.contact = contact.find($stateParams.id);
			vm.add = add;
			
			function add(){
				vm.contact = contact.save(vm.contact);
				$state.go('contacts.column');
			}
		}
})();