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
      remove: remove,
    }

    return ftry;

    function query() {
      $http.get(BASE_URL).success(function (res) {
        angular.copy(res, ftry.items);
      })
    }

    function save() {
      $http.post(BASE_URL, ftry.current).success(function (res) {
        if (ftry.current._id) {
          ftry.current = {};
        } else {
          ftry.items.push(res);
        }
      })
    }


    function remove(id) {
      $http.delete(BASE_URL + id).success(function (res) {
        ftry.query();
      })
    }

  }
})();
