const  members = require('../../services/members');

jest.mock('../../models/members');

describe('test service layer for members operations',()=>{
    test("Find a Member by ID", async ()=>{
        const member = await members.findById(1);
        expect(member[0].name).toBe('Test Member');
    });
    test("404_ when Find a non exist member by ID", async ()=>{
        const member = await members.findById(3);
        expect(member).toBe(404);
    })

    afterEach(()=>jest.resetAllMocks());
});