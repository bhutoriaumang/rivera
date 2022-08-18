const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		name: { type: String, required: true },
		date: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
		capacity: { type: Number, required: true},
	},
	{ collection: 'event-data' }
)

const model = mongoose.model('EventData', User)

module.exports = model