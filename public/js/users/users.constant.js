(function () {
  'use strict';

  var USER_PAGES = ['tel.page1', 'tel.page2', 'tel.page3'];

  angular
    .module('app.users')
    .constant('USER_PAGES', USER_PAGES);
})();
