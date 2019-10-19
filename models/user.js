const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = Schema(
	{
		name: {
			firstname: {
				type: String,
				required: true
			},
			lastname: {
				type: String,
				required: true
			}
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			validate: [ validateEmail, 'Please fill a valid email address' ],
			match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address' ]
		},
		gender: {
			type: String,
			default: 'MALE'
		},
		phoneNumber: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		qrURL: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userModel);
