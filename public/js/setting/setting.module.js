(function () {
  'use strict';

  angular
    .module('app.setting', [])
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('setting', {
        url: '/setting',
        templateUrl: '/js/setting/index.html',
        controller: 'SettingController as vm',
        resolve: {
          settingPrepService: settingPrepService
        },
      });
  }

  settingPrepService.$inject = ['settingService'];

  function settingPrepService(settingService) {
    return settingService.query();
  };
})();
