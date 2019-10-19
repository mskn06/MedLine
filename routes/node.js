const express = require('express');
const router = express.router;
const { addNode, getAllNodes } = require('../services/node');

// router.put('');

router.get('/', (req, res) => {
	getAllNodes(req.body.userId);
});

router.post('/', (req, res) => {
	addNode(req.body.node);
});
