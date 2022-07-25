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
}


module.exports= {
    findById
};