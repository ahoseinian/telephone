(function(){
	'use strict';

	angular
		.module('app.directives')
		.directive('confirmXBtn', confirmXBtn);

	function confirmXBtn() {
	  var directive = {
	    link: link,
	    templateUrl: '/js/directives/confirm-x/confirm-x.html',
	    scope:{
	    	clickFunc: '&'
	    },
	  };

	  return directive;

	  function link(scope, el, attrs) {
    	scope.confirmed = false;
    }	
	}
})();