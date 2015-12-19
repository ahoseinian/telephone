(function(){
	'use strict';

	angular
		.module('app.routes.messages')
		.controller('DeliveryController', DeliveryController);

		DeliveryController.$inject = ['message'];
		function DeliveryController(message){
			var vm = this;
			vm.mServ = message;
			message.query();
		}	
})();