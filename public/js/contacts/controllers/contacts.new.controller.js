(function(){
	'use strict';
	angular
		.module('app.routes.contacts')
		.controller('ContactsNewController', ContactsNewController);

		ContactsNewController.$inject = ['contact', '$stateParams', '$state', 'settingService'];
		function ContactsNewController(contact, $stateParams, $state, settingService){
			var vm = this;
			vm.contact = contact.find($stateParams.id);
			vm.add = add;
			vm.groups = settingService.items;
			
			function add(){
				vm.contact = contact.save(vm.contact);
				$state.go('contacts.column');
			}
		}
})();