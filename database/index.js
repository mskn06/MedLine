const mongoose = require("mongoose");
const ProvenDB = require("@southbanksoftware/provendb-node-driver").Database;

const provenDB_URI = "YOUR_PROVENDB_URI_HERE";
let dbObject;
let pdb;

// First we establish a connection to ProvenDB.
mongoose
	.connect(provenDB_URI, {
		useNewUrlParser: true
	})
	.then(client => {
		dbObject = client.db.db("YOUR_PROVENDB_SERVICE_HERE");
		pdb = new ProvenDB(dbObject);
	})
	.catch(err => {
		console.error("Error connecting to ProvenDB:");
		console.error(err);
		process.exit();
	});

module.exports = { dbObject, pdb };
