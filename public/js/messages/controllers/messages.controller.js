(function(){
	'use strict';
	angular
		.module('app.routes.messages')
		.controller('MessagesController', MessagesController);

		MessagesController.$inject = ['message'];
		function MessagesController(message){
			var vm = this;
			vm.message = message;
			message.query();
		}
})();