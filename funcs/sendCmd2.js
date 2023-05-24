const WebSocket = require("ws")
const ws = new WebSocket("ws://rat-server-n24e.onrender.com")

async function sendCmd2(cmd,target,uuid,w, data,role){
    w.send(JSON.stringify({
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

module.exports = sendCmd2