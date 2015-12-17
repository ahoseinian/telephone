(function(){
	'use strict';
	angular
		.module('app.routes.contacts')
		.controller('ContactsNewController', ContactsNewController);

		ContactsNewController.$inject = ['contact', '$stateParams'];
		function ContactsNewController(contact, $stateParams){
			var vm = this;
			vm.contact = contact.find($stateParams.id);
			vm.add = add;
			
			function add(){
				vm.contact = contact.save(vm.contact);
			}
		}
})();