(function () {
  'use strict';
  angular
    .module('myApp', [
      'ui.router',
      'app.common',
      'app.directives',
      'app.users',
      'app.routes.contacts',
      'app.routes.messages',
      'angular-loading-bar',
    ])
    .config(config)
    .controller('HomeController', HomeController);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    toastr.options.timeOut = 1000;
    toastr.options.positionClass = "toast-top-left";

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/js/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
      })
  };



  function HomeController() {
    var vm = this;
    vm.nav = window.navigator;
    vm.title = 'گروه تولیدی سالار';
    vm.resetTitle = resetTitle;

    vm.date = Date.now();

    function resetTitle() {
      vm.title = 'گروه تولیدی سالار';
    }

    vm.getBrowser = function () {
      var ua = navigator.userAgent,
        tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
      return M.join(' ');
    }

  }

})();
