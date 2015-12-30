(function () {
  'use strict';
  var letters = ['#', 
  'ا', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];



  angular
    .module('app.routes.contacts', [])
    .config(config)
    .constant('letters', letters);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('contacts', {
        url: "/contacts",
        templateUrl: "/js/contacts/templates/index.html",
        controller: 'ContactsController',
        controllerAs: 'vm',
        resolve: {
          contactsPromise: ['contact', function (contact) {
            return contact.getAll();
          }]
        }
      })
      .state('contacts.list', {
        url: "/contacts/list",
        templateUrl: "/js/contacts/templates/list.html",
        controller: 'ContactsController as vm',
      })
      .state('contacts.column', {
        url: "/contacts/column",
        templateUrl: "/js/contacts/templates/column.html",
        controller: 'ContactsController as vm',
      })



    .state('contacts.new', {
      url: "/new/:id",
      templateUrl: "/js/contacts/templates/new.html",
      controller: 'ContactsNewController',
      controllerAs: 'vm',
    })
  }


})();
