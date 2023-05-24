const WebSocket = require("ws")
const ws = new WebSocket("ws://localhost:2000")

async function sendId(w, id){
    w.send(JSON.stringify({
        data:{
            event:'id',
            data:id
        }
    }))
}

module.exports = sendId