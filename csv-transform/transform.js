'use strict';
var fs = require("fs");
var file = "aaa.sqlite3";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/telephone');
var Contact = require('../models/contact');


db.parallelize(function() {
	

	db.each("SELECT * FROM contacts", function(err, row) {
		var myRow = {};
		myRow.name = row.name;
		myRow.company = row.company;
		myRow.address = row.address;
		myRow.email = row.email;
		myRow.info = row.info;
		myRow.tavalod = row.tavalod;
		myRow.phones = []; 


		db.each("SELECT * FROM tels WHERE contact_id = " + row.id, function (err, row) {
			var myTel  = {};
			myTel.num = row.telnum;
			if (row.teltype == 'تلفن') myTel.mode = 'phone';
			if (row.teltype == 'موبایل') myTel.mode = 'mobile';
			if (row.teltype == 'فکس') myTel.mode = 'fax';
			myRow.phones.push(myTel);	
		}, function () {
			var contact = new Contact(myRow);
			console.log(contact);
			contact.save(function (err, ct) {
				if(err) console.log(err);
				console.log(ct);
			});
		});

  });
});


