var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
	res.send("Authority Page");
});

router.post("/signup", async (req, res) => {
	try {
		const authority = await Authority.findOne({
			authorityName: req.body.authorityName
		});

		if (authority) res.status(400).send("AuthorityName already exists!");

		//creates new authority
		const newauthority = new Authority(req.body);
		const savedauthority = await newauthority.save();
		res.status(201).send(savedauthority);
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const authority = await Authority.findOne({
			$or: [{
					authorityName: req.body.authorityName
				},
				{
					email: req.body.email
				}
			]
		});

		if (!authority) {
			res.status(404).send("The authority does not exist!");
		} else {
			if (password == req.body.password) res.status(200).send(authority);
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;