const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	text: {
		type: 'string',
		required: true
	},
	answers: {
		type: 'array',
		required: true
	}
})

module.exports = mongoose.model('Question', questionSchema);
