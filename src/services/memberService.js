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

async function findAll() {
    return new Promise(async (resolve, reject)=>{
        try{
            const members = await model.findAll();
            if(members && members.length != 0)
                resolve(members)
            else    
                resolve([]);
        } catch (err) {
            reject(JSON.stringify({"status":500, "error":err}));
        }
    })
};

async function findByName(name){
    return new Promise(async (resolve, reject) =>{
        try {
            const member = await model.findByName(name);
            if(member && member.length != 0)
                resolve(member)
            else
                resolve(404);
        }catch (err) {
            reject(JSON.stringify({"status":500, "error":err}));
        }
    
    })
};

async function findByNIC(nic){
    return new Promise(async (resolve, reject) =>{
        try {
            const member = await model.findByNIC(nic);
            if(member && member.length != 0)
                resolve(member)
            else
                resolve(404);
        }catch (err) {
            reject(JSON.stringify({"status":500, "error":err}));
        }
    
    })
};


async function createMember(member){
    return new Promise(async (resolve, reject) =>{
        try {
            const _member = await model.findByNIC(member['nic']);
            if (_member){
                resolve(400);
                return;
            }
            const rowNumber = await model.createMember(member);
            if(rowNumber == 0)
                resolve(400)
            else
                resolve(rowNumber);
        }catch (err) {
            reject(JSON.stringify({"status":500, "error":err}));
        }
    
    })
};

async function updateMember(id, member) {
    return new Promise( async (resolve, reject) =>{
        try{
            const resp = await model.updateMember(id, member);
            resolve(resp);
        }catch(err) {
            reject(JSON.stringify({"status":500, "error":err}));
        }
    });
};
async function deleteMember(id) {
    return new Promise( async (resolve, reject) =>{
        try{
            const _member = await model.findById(id);
            if(_member.length == 0){
                resolve(404);
                return;
            }
            const resp = await model.deleteMember(id);
            resolve(resp);
        }catch(err) {
            reject(JSON.stringify({"status":500, "error":err}));
        }
    });
};

module.exports = {
    findById,
    findAll,
    findByName,
    findByNIC,
    createMember,
    updateMember,
    deleteMember,
}