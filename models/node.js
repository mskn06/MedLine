const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodeModel = Schema(
	{
		patientId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		authorityId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Authority'
		},
		diagnosis: {
			type: String,
			required: true
		},
		prescription: {
			type: String,
			required: true
		},
		symptoms: {
			type: String,
			required: true
		},
		comments: {
			type: String
		},
		testingsRecommended: {
			type: String
		},
		testingsDone: [
			{
				name: String,
				report: String,
				files: [ String ]
			}
		],
		status: {
			type: String,
			enum: [ 'ACTIVE', 'COMPLETED' ],
			default: 'COMPLETED'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Node', nodeModel);
