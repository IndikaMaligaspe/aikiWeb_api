const members = jest.createMockFromModule('./members')

const data =  [
    {  "id":"1", 
        "nic":"NIC1", 
        "name":"Test Member", 
        "address": "Address 1", 
        "occupation": "Test Occ", 
        "date_of_birth":"1977-10-01", 
        "date_of_join" : "2002-10-01", 
        "sex": "M"
        },
        {"id":"2", 
        "nic":"NIC2", 
        "name":"Test Member 2", 
        "address": "Address 1", 
        "occupation": "Test Occ", 
        "date_of_birth":"1977-10-01", 
        "date_of_join" : "2002-10-01", 
        "sex": "M"
        },
    ]
async function findById(id) {
    return new Promise((resolve) =>{
        const member = data.filter((d)=>(d.id == id));
        if(member)
            resolve(member);    
    });
};

async function findAll() {
    return new Promise((resolve) =>{
        resolve(data);    
    });
}


async function findByName(name) {
    return new Promise((resolve) =>{
        const member = data.filter((d)=>(d.name == name));
        if(member)
            resolve(member);    
    });
};

async function findByNIC(nic) {
    return new Promise((resolve) =>{
        const member = data.filter((d)=>(d.nic == nic));
        if(member)
            resolve(member);    
    });
};

async function createMember(member) {
    return new Promise((resolve, reject) =>{
        const length = data.length;
        member["id"] = length+1;
        const newLength = data.push(member);
        if(newLength > length)
            resolve(newLength);
        else
            reject()    
    });
};

async function updateMember(id, member) {
    return new Promise(async (resolve, reject) =>{
        const _member = data.filter((d)=>(d.id == id));
        if(_member.length == 0){
            resolve(404);
            return;
        }
        _member[0]['nic'] = member.nic ? member.nic:_member[0].nic;
        _member[0]['name'] =member.name?member.name:_member[0].name;
        _member[0]['address'] =member.address?member.address:_member[0].address;
        _member[0]['occupation'] = member.occupation?member.occupation:_member[0].occupation;
        _member[0]['date_of_join'] =member.date_of_join?member.date_of_join.toISOString().slice(0, 19).replace('T', ' '):_member[0].date_of_join.toISOString().slice(0, 19).replace('T', ' ');
        _member[0]['date_of_birth'] =member.date_of_birth?member.date_of_birth.toISOString().slice(0, 19).replace('T', ' '):new Date(_member[0].date_of_birth).toISOString().slice(0, 19).replace('T', ' ');
        _member[0]['sex'] =member.sex?member.sex:_member[0].sex;
        const index = data.findIndex((m)=>(m.id==id));
        data.splice(index, 1, _member[0]);
        resolve(200);
    });
};
async function deleteMember(id) {
    return new Promise((resolve, reject) =>{
        let length = data.length;
        const index = data.findIndex((m)=>(m.id==id));
        data.splice(index, 1);
        let newLength = data.length;
        if(newLength < length)
            resolve(200);
        else
            reject()    
    });
};

module.exports= {
    findById,
    findAll,
    findByName,
    findByNIC,
    createMember,
    updateMember,
    deleteMember,
};