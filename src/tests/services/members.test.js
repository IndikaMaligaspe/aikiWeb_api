const  service = require('../../services/members');

jest.mock('../../models/members');

describe('test service layer for members operations',()=>{
    test("Find a Member by ID", async ()=>{
        const member = await service.findById(1);
        expect(member[0].name).toBe('Test Member');
    });
    test("404_ when Find a non exist member by ID", async ()=>{
        const member = await service.findById(3);
        expect(member).toBe(404);
    });
    test("get all users if existing",async ()=>{
        const members = await service.findAll();
        expect(members.length).toBe(2);
    });
    test("get all users with specific name",async ()=>{
        const members = await service.findByName('Test Member');
        expect(members.length).toBe(1);
    });
    test("Create new member when not available", async()=>{
        const member = {    
                            "nic":"NIC1", 
                            "name":"Test Member", 
                            "address": "Address 1", 
                            "occupation": "Test Occ", 
                            "date_of_birth":"1977-10-01", 
                            "date_of_join" : "2002-10-01", 
                            "sex": "M"
                        }
        const rowNumber = await service.createMember(member);
        expect(rowNumber).toBeGreaterThan(0);
    })
    afterEach(()=>jest.resetAllMocks());
});