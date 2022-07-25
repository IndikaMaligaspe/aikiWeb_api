var httpMocks = require('node-mocks-http');
const  service = require('../../index');

jest.mock('../../services/memberService');

describe("Testing routes", ()=>{
    test("test sample call", async()=>{
       var req = httpMocks.createRequest({
           method: 'GET',
           url: '/members/1'
       });
       var resp = httpMocks.createResponse();
       await service.requestListner(req, resp);
       var data = resp._getJSONData();
       expect(data[0].nic).toBe('NIC1');
    });

   

});