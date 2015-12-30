var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var connection = require('./db').db;

var ModelSchema = new Schema({
  name: {type: String, required: true},
  infos: {
		product: {
			texts:[{ name: String }],
			selects:[{
				name: String, 
				options:[{name: String}],
			}],
		},
		purchase: {
			texts:[{ name: String }],
			selects:[{
				name: String, 
				options:[{name: String}],
			}],
		},
	},
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
});


module.exports = connection.model('Model', ModelSchema);