// const members = jest.createMockFromModule('./members')

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
        const index = data.findIndex((m)=>(m.id==id));
        if(index){resolve(400); return}
        resolve(201);   
    });
};

async function updateMember(id, member) {
    return new Promise(async (resolve, reject) =>{
        const index = data.findIndex((m)=>(m.id==id));
        if(!index){resolve(404); return}
        resolve(200);
    });
};
async function deleteMember(id) {
    return new Promise((resolve, reject) =>{
        const index = data.findIndex((m)=>(m.id==id));
        if(!index){resolve(404); return}
        resolve(200);
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