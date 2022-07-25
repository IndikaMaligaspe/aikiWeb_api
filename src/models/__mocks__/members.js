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
}

module.exports= {
    findById,
    findAll,
    findByName,
    createMember,
};