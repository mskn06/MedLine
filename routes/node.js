const express = require("express");
const router = express.Router();
const { addNode, getAllNodes } = require("../services/node");
const io = require("../socket");

router.get("/:userId", async (req, res) => {
	try {
		res.status(200).send(await getAllNodes(req.params.userId));
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const data = await getConfirmation();
		if (data) {
			return res.redirect("/authority/login");
		}
	} catch (err) {
		res.status(500).send(err);
	}

	res.send("Try again");
});

const getConfirmation = async () => {
	io.sockets
		.in(req.body.patientId)
		.emit(
			"confirm_node",
			{ msg: "Confirm", data: req.body },
			async data => {
				if (!data.isConfirmed) return false;
				else {
					const node = await addNode(req.body);
					return node;
				}
			}
		);
};

module.exports = router;
