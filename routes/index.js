var express = require("express");
var router = express.Router();
const User = require("../models/user")

/* GET home page. */
router.get("/", (req, res, next) => {
	res.render("index", {
		title: "Express"
	});
});

router.get("/:authorityId/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId).populate('nodes');
		res.status(200).render("index", {
			patient: user
		})
	} catch (err) {
		res.status(500).send({
			msg: err
		})
	}
})


module.exports = router;