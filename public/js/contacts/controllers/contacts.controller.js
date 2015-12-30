(function () {
  'use strict';
  angular
    .module('app.routes.contacts')
    .controller('ContactsController', ContactsController);

  ContactsController.$inject = ['contact', 'message', 'letters', '$sce', '$timeout'];

  function ContactsController(contact, message, letters, $sce, $timeout) {
    var vm = this;
    vm.letters = letters;
    vm.message = message;
    vm.contacts = contact.contacts;

    vm.remove = remove;
    vm.addTel = addTel;
    vm.removeTel = removeTel;
    vm.search = search;
    vm.highlight = highlight;

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
      if(isLetter){
        return contact.search(query, isLetter);
      }
      var tempQuery = query;
      $timeout(function () {
        if (tempQuery == vm.query) {
          contact.search(query);
        }
      }, 500);
    }

    function highlight(text, search) {
      if (!search) {
        return $sce.trustAsHtml(text);
      }
      if (text) {
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<mark>$&</mark>'));
      }
    }
  }
})();
