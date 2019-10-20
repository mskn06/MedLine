const io = require("socket.io").listen(8000);

io.sockets.on("connection", socket => {
	socket.on("join", data => {
		socket.join(data.userId);
	});
});

module.exports = io;
