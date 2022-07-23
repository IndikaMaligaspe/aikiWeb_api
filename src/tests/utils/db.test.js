const db = require('mysql');

let conn;
describe("Test Connection", ()=>{
    beforeAll(async ()=>{
            conn = db.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: 'kissme',
                    database:'slaia'
                });
    });

    test("Test Connection", async () =>{
        conn.query("SELECT 1",(err, row) =>{
            expect(row.length).toBe(1);
        });
    });

    afterAll(async ()=>{
        await conn.end();
    });
});

