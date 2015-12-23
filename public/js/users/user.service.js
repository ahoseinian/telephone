(function () {
  'use strict';

  angular
    .module('app.users')
    .factory('userService', userService);

  userService.$inject = ['$http'];

  function userService($http) {
    var BASE_URL = '/api/users/';
    var ftry = {
      items: [],
      current: {},
      query: query,
      save: save,
    }

    return ftry;

    function query() {
      $http.get(BASE_URL).success(function (res) {
        angular.copy(res, ftry.items);
      })
    }

    function save() {
      if (ftry.current._id) update(ftry.current);
      else insert(ftry.current);
    }


    //private methods

    function insert(itm) {
      $http.post(BASE_URL, itm).success(function (res) {
        ftry.items.push(res);
      })
    }
  }
})();
