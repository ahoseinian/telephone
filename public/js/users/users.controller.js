(function() {
  'use strict';

  angular
  	.module('app.users')
  	.controller('UsersController', UsersController);

  	UsersController.$inject = ['userService'];
  	function UsersController(userService){
  		var vm = this;
  		vm.service = userService;
      vm.removeUser = removeUser;
  		userService.query();


      function removeUser(id){
        userService.remove(id); 
      }
  	}
})();
