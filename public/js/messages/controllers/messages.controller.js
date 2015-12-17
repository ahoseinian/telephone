(function(){
	'use strict';
	angular
		.module('app.routes.messages')
		.controller('MessagesController', MessagesController);

		MessagesController.$inject = ['message', '$sce'];
		function MessagesController(message){
			var vm = this;
			vm.message = message;
		}
})();