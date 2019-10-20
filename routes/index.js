var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("home");
});

router.get("/visit/:userId", async (req, res) => {
	try {
<<<<<<< HEAD
		const user = await User.findById(req.params.userId).populate("nodes");
		res.status(200).render("authority_nodes", {
=======
		const user = await User.findById(req.params.userId).populate('nodes');
		res.render("authority_nodes", {
>>>>>>> 229cf39dd6e7e023559553f31b6456b2849dae64
			patient: user
		});
	} catch (err) {
		res.status(500).send({
			msg: err
		});
	}
});

module.exports = router;
