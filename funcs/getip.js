const axios = require(`axios`).default

async function getIp(){
    var ipRaw = await axios.get(`https://api.ipify.org?format=json`)
    return ipRaw.data.ip
}

module.exports = getIp