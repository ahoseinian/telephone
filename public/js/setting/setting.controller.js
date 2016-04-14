(function () {
  'use strict';

  angular
    .module('app.setting')
    .controller('SettingController', SettingController);

  SettingController.$inject = ['settingService'];

  function SettingController(settingService) {
    var vm = this;
    vm.groups = settingService.items;
    vm.newGroup = settingService.Group;
  }
})();
