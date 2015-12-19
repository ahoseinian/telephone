(function() {
  'use strict';

  angular
    .module('app.users', [])
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
  	$stateProvider
  		.state('users',{
  			url:'/users',
  			templateUrl: '/js/users/index.html',
  			controller: 'UsersController',
  			controllerAs: 'vm',
  		});

  }
})();
