(function(){
	'use strict';
	angular
		.module('app.routes.contacts')
		.controller('ContactsController', ContactsController);

		ContactsController.$inject = ['contact', 'message', '$sce'];
		function ContactsController(contact, message, $sce){
			var vm = this;
			vm.message = message;
			vm.contacts = contact.contacts;
			
			vm.remove = remove;
			vm.addTel = addTel;
			vm.removeTel = removeTel;
			vm.search = search;
			vm.highlight = highlight;

			function remove(id){
				contact.remove(id);
			}

			function addTel(ct, tel){
				contact.addTel(ct, tel);
			}

			function removeTel(ct, tel){
				contact.removeTel(ct, tel);	
			}

			function search () {
				if(vm.query.length > 1) contact.search(vm.query);
			}

			function highlight (text, search) {
				if (!search) {
	        return $sce.trustAsHtml(text);
	    	}
	    	if(text){
	    		return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<mark>$&</mark>'));
	    	}
			}
		}
})();