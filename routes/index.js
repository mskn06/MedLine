var express = require("express");
var router = express.Router();
const User = require("../models/user")

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("home");
});

router.get("/:authorityId/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId).populate('nodes');
		res.render("authority_nodes", {
			patient: user
		})
	} catch (err) {
		res.status(500).send({
			msg: err
		})
	}
})


module.exports = router;