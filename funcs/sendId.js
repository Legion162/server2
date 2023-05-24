const WebSocket = require("ws")
const ws = new WebSocket("wss://rat-server-n24e.onrender.com")

async function sendId(w, id){
    w.send(JSON.stringify({
        data:{
            event:'id',
            data:id
        }
    }))
}

module.exports = sendId