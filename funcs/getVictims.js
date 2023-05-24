const axios = require(`axios`).default

async function getVictims(){
    var victims = await axios.get(`http://localhost:2000/victims`)
    return victims.data
}

module.exports = getVictims
