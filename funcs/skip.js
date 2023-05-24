const WebSocket = require('ws');
const ws = new WebSocket('wss://rat-server-n24e.onrender.com');

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
