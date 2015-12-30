var mongoose = require('mongoose'), 
	mongoosePaginate = require('mongoose-paginate'), 
	Schema = mongoose.Schema;
var connection = require('./db').db;

var ProductSchema = new Schema({
  code: {type: Number, required: true},
  _model: {type: Schema.Types.ObjectId, ref: 'Model'}
}, { timestamps: { createdAt: 'created_at' }, strict: false});

ProductSchema.plugin(mongoosePaginate);

module.exports = connection.model('Product', ProductSchema);