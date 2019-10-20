const express = require("express");
const router = express.Router();
const { addNode, getAllNodes } = require("../services/node");
const io = require("../socket");
const User = require("../models/user");
const Node = require("../models/node");
var otpGenerator = require("otp-generator");
const fetch = require("node-fetch");

var email = require("emailjs");
var emailClient = email.server.connect({
	user: "siddhantj929@gmail.com",
	password: "a0b112da-a3a7-4cfa-82df-578a558da469",
	host: "smtp.elasticemail.com",
	port: 2525
});

router.get("/:userId", async (req, res) => {
	try {
		res.status(200).send(await getAllNodes(req.params.userId));
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/:aId/:userId", async (req, res) => {
	try {
		var otp = otpGenerator.generate(6, {
			upperCase: false,
			specialChars: false
		});

		req.body.otp = otp;

		const newNode = Node(req.body);
		await newNode.save();

		const user = await User.findById(req.params.userId);

		fetch(
			"https://api.elasticemail.com/v2/email/send?apikey=12e523ec-7704-4623-b6e5-5c1ab45a6b23",
			{
				method: "POST",
				body: JSON.stringify({
					bodyText: `
				Diagnosis: ${req.body.diagnosis}
				Symptoms: ${req.body.symptoms}
				Prescriptions: ${req.body.prescription}
			
				Confirmation OTP: ${otp}

				Please only provide the OTP to the doctor if satisfied. Thanks!
				`,
					from: "siddhantj929@gmail.com",
					subject: "Confirm MedShare Record",
					msgTo: user.email,
					to: user.email
				})
			}
		)
			.then(raw => raw.json())
			.then(data => {
				if (data.success) {
					res.render("otp", { nodeId: newNode.id });
				} else {
					res.send(data.error);
				}
			});
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

router.post("/otp", async (req, res) => {
	const node = await Node.findById(req.body.nodeId);
	if (node && node.otp == req.body.otp) {
		node.status = "COMPLETED";
		await node.save();
		res.status(200).send("OTP Confirmed! Your consulation was accepted.");
	} else {
		res.status(400).send("Wrong OTP");
	}
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
