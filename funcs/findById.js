async function findById(users, id){
    let t = [];
    users.forEach((e) => {
        // console.log(e)
      if (e.id == id) {
        t.push(e);
      }
    });
    return t
}

module.exports = findById