(function () {
  'use strict';

  angular
    .module('app.routes.contacts')
    .factory('contact', contact);

  contact.$inject = ['$http'];

  function contact($http) {
    var factory = {};
    factory.contacts = [];

    factory.find = find;
    factory.change = change;
    factory.get = get;
    factory.getAll = getAll;
    factory.search = search;
    factory.create = create;
    factory.update = update;
    factory.save = save;
    factory.remove = remove;
    factory.addTel = addTel;
    factory.removeTel = removeTel;
    factory.getTodaysTavalods = getTodaysTavalods;

    return factory;

    function find(id) {
      return factory.contacts.find(byId) || {};

      function byId(item) {
        return item._id == id;
      }
    }

    function change(id, data) {
      factory.contacts.forEach(fixer);

      function fixer(item, i) {
        if (item._id == data._id) {
          factory.contacts[i] = data;
        }
      }
    }

    function get(id) {
      return $http.get('/api/contacts/' + id).then(function (res) {
        return res.data;
      });
    };

    function getAll() {
      return $http.get('/api/contacts').success(function (data) {
        angular.copy(data, factory.contacts);
      });
    };

    function getTodaysTavalods(){
      return $http.get('/api/contacts/tavalod/today'); 
    }

    function search(query, isLetter, group) {
      var url = isLetter ? '/api/contacts/search/letter' : '/api/contacts/search/';
      return $http.get(url, {
        params: {
          q: query,
          group: group
        }
      }).success(function (data) {
        angular.copy(data, factory.contacts);
      });
    };

    function create(contact) {
      return $http.post('/api/contacts', contact).success(function (data) {
        factory.contacts.push(data);
      });
    };

    function update(contact) {
      return $http.put('/api/contacts/' + contact._id, contact).success(function (data) {
        factory.change(contact._id, data);
      });
    }

    function save(contact) {
      if (contact._id) {
        factory.update(contact);
        return factory.find(contact._id);
      } else {
        factory.create(contact);
        return {};
      }
    }

    function remove(id) {
      return $http.delete('/api/contacts/' + id).success(function (res) {
        angular.copy(factory.contacts.filter(filter), factory.contacts);

        function filter(item) {
          return item._id != id;
        }
      });
    };

    function addTel(ct, tel) {
      return $http.post('/api/contacts/' + ct._id + '/tels', tel).success(function (res) {
        factory.change(ct._id, res);
      });
    }

    function removeTel(ct, tel) {
      return $http.delete('/api/contacts/' + ct._id + '/tels/' + tel._id).success(function (res) {
        factory.change(ct._id, res);
      });
    }
  }

})();
