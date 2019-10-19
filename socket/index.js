const io = require("socket.io").listen(80);

io.sockets.on("connection", socket => {
	socket.on("join", data => {
		socket.join(data.userId);
	});
});

module.exports = io;
