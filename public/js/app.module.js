(function(){
	'use strict';
	angular
		.module('myApp', [
			'ui.router',
			'app.common',
			'app.directives', 
			'app.routes.contacts',
			'app.routes.messages',
			'angular-loading-bar',
		])
		.config(config);

	config.$inject = ['$urlRouterProvider'];
	function config($urlRouterProvider){
		$urlRouterProvider.otherwise("/contacts");

		toastr.options.timeOut = 1000;
		toastr.options.positionClass = "toast-top-left";
	};

})();
