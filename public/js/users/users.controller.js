(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['userService', 'USER_PAGES'];

  function UsersController(userService, USER_PAGES) {
    var vm = this;
    vm.items = userService.items;
    vm.curItem = userService.User();
    vm.pages = getPages;

    console.log(userService.items);

    function getPages(user) {
      return USER_PAGES.filter(function (item) {
        if (!user.pages.length) return true;
        var hasPage = user.pages.find(function (page) {
          return item == page.name;
        });
        return !hasPage;
      });
    }

  }
})();
