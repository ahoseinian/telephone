(function(){
	'use strict';

	angular
		.module('app.routes.messages')
		.factory('message', message);

	message.$inject = ['$http'];
	function message($http){
		var factory = {};
		factory.tels = [];
		factory.addTel = addTel;
		factory.removeTel = removeTel;
		factory.sendMessage = sendMessage;


		return factory;

		function addTel (tel) {
			if(!tel){
				return;
			} else if (factory.tels.indexOf(tel) < 0) {
				factory.tels.push(tel);
				toastr.success("شماره به پیغام افزوده شد");
			} else {
				toastr.error("شماره وجود دارد");
			}
		}

		function removeTel(tel){
			var index = factory.tels.indexOf(tel);
			if (index > -1) {
		    factory.tels.splice(index, 1);
		    toastr.info("شماره از پیغام حذف شد");
			}
		}


		function sendMessage(){
			var data = {
				sender: 10006981620,
				receptor: factory.tels.join(','),
				message: factory.text,
			};
			return $http({
				url: "https://api.kavenegar.com/v1/73443439694C6F697163633233746B6F352B723172513D3D/sms/send.json",
		    method: "POST",
		    params: data
			}).success( function (res) {
					console.log(res);
				});
		}


	}

})();