var mongoose = require('mongoose'), 
	mongoosePaginate = require('mongoose-paginate'), 
	Schema = mongoose.Schema;

var MessageSchema = new Schema({
	messageid: Number,
	message: String,
	status: Number,
	statustext: String,
	sender: String,
	receptor: String,
	date: Number,
	cost: Number,
}, { timestamps: { createdAt: 'created_at' }});

MessageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Message', MessageSchema);