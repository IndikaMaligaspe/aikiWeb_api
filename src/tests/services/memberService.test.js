const  service = require('../../services/memberService');

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
    });
    test("400_When creating same members", async ()=>{
        const members = [{    
                        "nic":"NIC1", 
                        "name":"Test Member", 
                        "address": "Address 1", 
                        "occupation": "Test Occ", 
                        "date_of_birth":"1977-10-01", 
                        "date_of_join" : "2002-10-01", 
                        "sex": "M"
                    },
                    {    
                        "nic":"NIC1", 
                        "name":"Test Member2", 
                        "address": "Address 2", 
                        "occupation": "Test Occ 2", 
                        "date_of_birth":"1977-10-01", 
                        "date_of_join" : "2002-10-01", 
                        "sex": "F"
                    },
                ];
                let resp = await service.createMember(members[0]);
                resp = await service.createMember(members[1]);
                expect(resp).toBe(400);
    });
    test("update members when available", async ()=>{
        const member = {    
            "name":"Test Member 111", 
            "address": "Address 1111", 
            "date_of_join" : new Date("2002-10-01"), 
        }

        let resp = await service.updateMember(1,member);
        expect(resp).toBe(200);
    });
    test("404 when updating a non available member", async ()=>{
        const member = {    
            "name":"Test Member 111", 
            "address": "Address 1111", 
            "date_of_join" : new Date("2002-10-01"), 
        }

        let resp = await service.updateMember(1001,member);
        expect(resp).toBe(404);
    });
    test("Delete when member available", async ()=>{
        let resp = await service.deleteMember(1);
        expect(resp).toBe(200);
    });
    test("404_Delete when member not available", async ()=>{
        let resp = await service.deleteMember(1001);
        expect(resp).toBe(404);
    });
    afterEach(()=>jest.resetAllMocks());
});