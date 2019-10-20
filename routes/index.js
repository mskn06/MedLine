var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Authority = require("../models/authority");

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("home");
});

router.get("/:aId/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId).populate("nodes");
		const a = await Authority.findById(req.params.aId);
		res.status(200).render("authority_nodes", {
			patient: user,
			a: a
		});
	} catch (err) {
		res.status(500).send({
			msg: err
		});
	}
});

module.exports = router;
