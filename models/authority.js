const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorityModel = Schema(
	{
		authorityName: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			enum: [
				"Medical Institute/Hospital",
				"Doctor",
				"Chemist",
				"Testing Lab"
			],
			default: "Doctor"
		},
		proof: {
			hospitalLicense: {
				type: String
			},
			doctorLicense: {
				type: String
			},
			chemistLicense: {
				type: String
			},
			labLicense: {
				type: String
			}
		},
		staff: {
			type: [
				{
					type: Schema.Types.ObjectId,
					ref: "Authority"
				}
			]
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Authority", authorityModel);
