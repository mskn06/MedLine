const io = require("socket.io").listen(8000);

io.sockets.on("connection", socket => {
	socket.on("join", data => {
		console.log(userId + " Joined");
		socket.join(data.userId);
	});
});

module.exports = io;
