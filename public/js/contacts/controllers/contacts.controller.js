(function() {
  'use strict';
  angular
    .module('app.routes.contacts')
    .controller('ContactsController', ContactsController);

  ContactsController.$inject = ['contact', 'message', 'letters', '$sce', '$timeout', '$scope', 'settingService'];

  function ContactsController(contact, message, letters, $sce, $timeout, $scope, settingService) {
    var vm = this;
    vm.letters = letters;
    vm.message = message;
    vm.contacts = contact.contacts;
    vm.groups = settingService.items;
    vm.groups.push(new settingService.GroupObj({_id:'notSet', name: 'فاقد گروه'}));
    console.log(vm.groups);
    vm.remove = remove;
    vm.addTel = addTel;
    vm.removeTel = removeTel;
    vm.search = search;
    vm.highlight = highlight;
    vm.changeContact = changeContact;

    contact.getTodaysTavalods().success(function(data) {
      vm.tavalods = data;
    });

    function remove(id) {
      contact.remove(id);
    }

    function addTel(ct, tel) {
      contact.addTel(ct, tel);
    }

    function removeTel(ct, tel) {
      contact.removeTel(ct, tel);
    }

    function search(query, isLetter) {
      if (isLetter) {
        return contact.search(query, isLetter);
      }
      var tempQuery = query;
      $timeout(function() {
        if (tempQuery == vm.query) {
          contact.search(query, false, vm.group);
        }
      }, 500);
    }

    function highlight(text, search) {
      var search = $scope.vm.query || $scope.$parent.vm.query;
      if (!search) {
        return $sce.trustAsHtml(text);
      }
      if (text) {
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<mark>$&</mark>'));
      }
    }

    function changeContact(contacts) {
      angular.copy(contacts, vm.contacts);
    }
  }
})();
