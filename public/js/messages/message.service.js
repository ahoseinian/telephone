(function () {
  'use strict';

  angular
    .module('app.routes.messages')
    .factory('message', message);

  message.$inject = ['$http'];

  function message($http) {
    var BASE_URL = "/api/messages/";
    var factory = {
      messages: [],
      tels: [],
      query: query,
      addTel: addTel,
      removeTel: removeTel,
      sendMessage: sendMessage,
      check: check,
    };

    return factory;

    function query() {
      $http.get(BASE_URL).success(function (res) {
        angular.copy(res, factory.messages);
      });
    }

    function addTel(tel) {
      if (!tel) {
        return;
      } else if (factory.tels.indexOf(tel) < 0) {
        factory.tels.push(tel);
        toastr.success("شماره به پیغام افزوده شد");
      } else {
        toastr.error("شماره وجود دارد");
      }
    }

    function removeTel(tel) {
      var index = factory.tels.indexOf(tel);
      if (index > -1) {
        factory.tels.splice(index, 1);
        toastr.info("شماره از پیغام حذف شد");
      }
    }


    function sendMessage() {
      var data = {
        sender: 10006981620,
        receptor: factory.tels.join(','),
        message: factory.text,
      };
      return $http({
        url: "https://api.kavenegar.com/v1/73443439694C6F697163633233746B6F352B723172513D3D/sms/send.json",
        method: "POST",
        params: data
      }).success(function (msg) {
        save(msg.entries[0]);
      });
    }

    function save(msg) {
      $http.post(BASE_URL, msg).success(function (res) {
        factory.messages.push(res);
      });
    }

    function update(msg) {
      $http.put(BASE_URL + msg.messageid, msg)
        .success(function (res) {
          factory.messages.map(change);

          function change(itm) {
            if (itm.messageid === msg.messageid) {
              itm.status = msg.status;
              itm.statustext = msg.statustext;
            }
            return itm;
          }
        });
    }

    function check(msg) {
      $http.get("https://api.kavenegar.com/v1/73443439694C6F697163633233746B6F352B723172513D3D/sms/status.json?messageid=" + msg.messageid)
        .success(function (res) {
          update(res.entries[0]);
        })
    }

  }

})();
