const express = require('express');
const router = express.router;
const { addNode, getAllNodes } = require('../services/node');

router.get('/:userId', async (req, res) => {
	try {
		res.status(200).send(await getAllNodes(req.params.userId));
	} catch (err) {
		res.status(500).send(err);
	}
});

router.post('/', (req, res) => {
	try {
		addNode(req.body);
	} catch (err) {
		res.status(500).send(err);
	}
});
