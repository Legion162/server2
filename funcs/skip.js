const WebSocket = require('ws');
const ws = new WebSocket('ws://rat-server-n24e.onrender.com');

async function skip() {
	ws.send(
		JSON.stringify({
			data: {
				event: 'ignore',
			},
		})
	);
}

module.exports = skip;
