(function(){
	'use strict';
	angular
		.module('app.routes.messages')
		.controller('MessagesNewController', MessagesNewController);

		MessagesNewController.$inject = ['message', '$stateParams'];
		function MessagesNewController(message, $stateParams){
			var vm = this;
			vm.message = message.find($stateParams.id);
			vm.add = add;
			
			function add(){
				vm.message = message.save(vm.message);
			}
		}
})();