var express = require("express");
var router = express.Router();
const qrcode = require("qrcode");

router.get("/", function(req, res, next) {
	res.send("User Page");
});

router.post("/signup", async (req, res) => {
	try {
		const user = await User.findOne({
			name: req.body.firstname + " " + req.body.lastname
		});

		if (user) res.status(400).send("userName already exists!");

		//creates new user
		const newuser = new User(req.body);

		qrcode.toDataURL(newuser.id, (err, url) => {
			if (err) throw "QR Code wasn't created.";

			newuser.qrURL = url;
		});

		const saveduser = await newuser.save();
		res.status(201).send(saveduser);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({
			$or: [
				{ name: req.body.firstname + " " + req.body.lastname },
				{ email: req.body.email },
				{ phoneNumber: req.body.phoneNumber }
			]
		});

		if (!user || password !== req.body.password) {
			res.status(404).send("Wrong credentials");
		} else {
			res.render("index", { patient: user });
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
