const WebSocket = require("ws")
const ws = new WebSocket("ws://localhost:2000")

async function sendCmd(cmd,target,uuid,data, role){
    ws.send(JSON.stringify({
        data:{
            event:'cmd',
            cmd:cmd,
            target:target,
            uuid:uuid,
            data:data,
            role:role
        }
    }))
}

module.exports = sendCmd