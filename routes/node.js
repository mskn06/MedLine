const express = require("express");
const router = express.Router();
const { addNode, getAllNodes } = require("../services/node");
const io = require("../socket");

// var email = require("emailjs");
// var emailClient = email.server.connect({
// 	user: "siddhantj929@gmail.com",
// 	password: "a0b112da-a3a7-4cfa-82df-578a558da469",
// 	host: "smtp.elasticemail.com",
// 	port: 2525
// });

router.get("/:userId", async (req, res) => {
	try {
		res.status(200).send(await getAllNodes(req.params.userId));
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/", async (req, res) => {
	try {
		// server.send(
		// 	{
		// 		text: `
		// 		Diagnosis: ${req.body.diagnosis}
		// 		Symptoms: ${req.body.symptoms}
		// 		Prescriptions: ${req.body.prescription}
		// 	`,
		// 		from: "Siddhant <siddhantj929@gmail.com>",
		// 		to: req.body.,
		// 		cc: "else <else@your-email.com>",
		// 		subject: "testing emailjs"
		// 	},
		// 	function(err, message) {
		// 		console.log(err || message);
		// 	}
		// );
		const data = await getConfirmation(req.body);
		if (data) {
			res.status(201).send("Confirmed");
		}
	} catch (err) {
		res.status(500).send(err);
	}

	res.send("Try again.");
});

const getConfirmation = async data => {
	io.sockets
		.in(data.patientId)
		.emit("confirm_node", { msg: "Confirm", data }, async _data => {
			if (!_data.isConfirmed) return false;
			else {
				const node = await addNode(data);
				return node;
			}
		});
};

module.exports = router;
