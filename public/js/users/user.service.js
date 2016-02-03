(function () {
  'use strict';

  angular
    .module('app.users')
    .factory('userService', userService);

  userService.$inject = ['$http'];

  function userService($http) {
    var BASE_URL = '/api/users/';

    function Page(atrs) {
      if (!(this instanceof Page)) return new Page(atrs);
      $.extend(this, atrs);
      if (!this.status) {
        this.status = 1
      }
    };

    function User(atrs) {
      if (!(this instanceof User)) return new User(atrs);
      $.extend(this, atrs);

      if (this.pages) {
        this.pages = this.pages.map(Page);
      }
    };

    User.prototype.$save = function () {
      var _this = this;
      $http.post(BASE_URL, this).success(function (res) {
        if (_this._id) {
          _this.constructor(res);
        } else {
          ftry.items.push(User(res));
        }
      });
    };

    User.prototype.$remove = function () {
      if (window.confirm("ARE YOU SURE ? ")) {
        $http.delete(BASE_URL + this._id).success(function (res) {
          ftry.query();
        });
      };
    };

    User.prototype.$addPage = function (name) {
      this.pages.push(Page({
        name: name
      }));
    };

    var ftry = {
      User: User,
      items: [],
      query: query,
    }

    return ftry;

    function query() {
      return $http.get(BASE_URL).success(function (res) {
        angular.copy(res.map(User), ftry.items);
      });
    }

  }
})();
