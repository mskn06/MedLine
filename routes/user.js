var express = require("express");
var router = express.Router();
const qrcode = require("qrcode");
const User = require("../models/user");

router.get("/signup", (req, res) => {
	res.render("user/signup");
});

router.post("/signup", async (req, res) => {
	try {
		const user = await User.findOne({
			name: req.body.name
		});

		if (user)
			res.status(400).send({
				msg: "userName already exists!"
			});

		//creates new user
		const newuser = new User(req.body);

		qrcode.toDataURL(newuser.id, (err, url) => {
			if (err) throw "QR Code wasn't created.";

			newuser.qrURL = url;
		});

		const saveduser = await newuser.save();
		res.status(201).render("index", {
			title: "Sign Up",
			patient: saveduser
		});
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({
			$or: [
				{
					email: req.body.email
				},
				{
					phoneNumber: req.body.phoneNumber
				}
			]
		});

		if (!user || req.body.password != req.body.password) {
			res.status(404).send({
				msg: "Wrong credentials"
			});
		} else {
			res.render("index", {
				patient: user
			});

			// res.send(user);
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/login", (req, res) => {
	res.render("user/login");
});

module.exports = router;
