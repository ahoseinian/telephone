(function () {
  'use strict';

  angular
    .module('app.setting')
    .factory('settingService', settingService);

  settingService.$inject = ['$http'];

  function settingService($http) {
    var BASE_URL = '/api/settings/';

    function Group(atrs) {
      if (!(this instanceof Group)) return new Group(atrs);
      $.extend(this, atrs);
    };

    Group.prototype.$save = function () {
      var _this = this;
      $http.post(BASE_URL, this).success(function (res) {
        if (_this._id) {
          _this.constructor(res);
        } else {
          ftry.items.push(Group(res));
        }
      });
    };

    Group.prototype.$remove = function () {
      if (window.confirm("ARE YOU SURE ? ")) {
        $http.delete(BASE_URL + this._id).success(function (res) {
          ftry.query();
        });
      };
    };

    var ftry = {
      Group: new Group(),
      items: [],
      query: query,
      GroupObj: Group
    }

    return ftry;

    function query() {
      return $http.get(BASE_URL).success(function (res) {
        angular.copy(res.map(Group), ftry.items);
      });
    }

  }
})();
