const model = require('../models/members');

async function findById(id){
    return new Promise(async (resolve, reject) =>{
        try {
            const member = await model.findById(id);
            if(member && member.length != 0)
                resolve(member)
            else
                resolve(404);
        }catch (err) {
            reject(JSON.stringify({"status":500, "error":err}));
        }
    
    })
}

module.exports = {
    findById,
}