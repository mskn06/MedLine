const { pdb } = require('../database');
const Node = require('../models/node');

exports.getNode = async (nodeId) => await Node.findById(nodeId);

exports.getAllNodes = async (userId) => await Node.find({ userId });

exports.addNode = async (node) => {
	const newnNode = await Node(node).save();
	setTimeout(this.submitProof, 1000);
	return newnNode;
};

exports.submitProof = async () => {
	const proof = await pdb.submitProof();
	setTimeout(this.validateChain.bind(this, proofId), 10000);
};

exports.validateChain = async (proofId) => {
	try {
		const verification = await pdb.verifyProof(proofId);
	} catch (err) {
		console.log(err);
	}
};
