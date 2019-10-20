const express = require("express");
const router = express.router;
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
		io.sockets
			.in(req.body.patientId)
			.emit("confirm_node", { msg: "Confirm", data: req.body }, data => {
				if (!data.isConfirmed) throw "Diagnosis Rejected";
				else {
					const node = await addNode(req.body);
					res.status(201).send({
						msg: "Node Confirmed!",
						data: node
					})
				}
			});
	} catch (err) {
		res.status(500).send(err);
	}
});
