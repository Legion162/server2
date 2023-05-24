const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:2000');

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
