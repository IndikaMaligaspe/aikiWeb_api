const db = require('mysql');
const members = require('../../models/members');
// const { connection } = require('../../utils/db');


const SCHEMA = 'slaia';
const NIC1 = 'testNIC_1';
const NIC2 = 'testNIC_2';

let MEM_ID1, MEM_ID2;
let NAME = 'Test User1';
let CREAETED_ROW_ID;

describe('Test Members model', ()=> {
    let conn;
    beforeAll(async ()=>{
        conn = db.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'kissme',
                database:'slaia'
            });
        
        const q1 = `INSERT INTO ${SCHEMA}.members
                (nic, name, address, occupation, date_of_join, date_of_birth, sex)
                VALUES (
                   '${NIC1}',
                   'Test User1',
                   'Test Address',
                   'Occupation 1',
                   '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',
                   '${new Date('1977-09-21').toISOString().slice(0, 19).replace('T', ' ')}',
                   'M'     
                )`  
        const q2 = `INSERT INTO ${SCHEMA}.members 
                (nic, name, address, occupation, date_of_join, date_of_birth, sex)
                VALUES (
                    '${NIC2}',
                   'Test User2',
                   'Test Address',
                   'Occupation 2',
                   '${new Date().toISOString().slice(0, 19).replace('T', ' ')}',
                   '${new Date('1977-09-21').toISOString().slice(0, 19).replace('T', ' ')}',
                   'M'     
                )` 
        await conn.query(q1);   
        await conn.query(q2);    
        
        const q3 = `SELECT id FROM ${SCHEMA}.members WHERE NIC='${NIC1}'`;
        const q4 = `SELECT id FROM ${SCHEMA}.members WHERE NIC='${NIC2}'`;    
        
        let row =  await _executeQuery(q3, conn)
        MEM_ID1 =  row[0].id

        row = await _executeQuery(q4, conn);
        MEM_ID2  =  row[0].id

    });

    test("Test findById", async () =>{
        const member = await members.findById(MEM_ID1);
        expect(member[0].name).toBe('Test User1');
    });

    test("Test findAll", async () =>{
        const membersArr = await members.findAll();
        expect(membersArr.length).toBeGreaterThan(1);
    });

    test("Test findByName", async () =>{
        const membersArr = await members.findByName(NAME);
        expect(membersArr[0].name).toBe('Test User1');
    });

    test("Test findByNIC", async () =>{
        const membersArr = await members.findByNIC(NIC1);
        expect(membersArr[0].nic).toBe(NIC1);
    });


    test("Create new Member", async() => {
        const member = {
            nic:NIC1,
            name:'Test User1',
            address:'Test Address',
            occupation:'Occupation 1',
            date_of_join:new Date().toISOString().slice(0, 19).replace('T', ' '),
            date_of_birth:new Date('1977-09-21').toISOString().slice(0, 19).replace('T', ' '),
            sex:'M'     
        }
        const rowId = await members.createMember(member);
        expect(rowId).toBeGreaterThan(0);
    });

    test("Update existing Member", async() => {
        const id = MEM_ID1;
        const member = {
            address:'Test Address New',
            occupation:'Occupation New',
        }

        const updated = await members.updateMember(id, member);
        expect(updated).toBe(200);
    });

    test("404 when update non existing Member", async() => {
        const id = '100001';
        const member = {
            address:'Test Address New',
            occupation:'Occupation New',
        }

        const updated = await members.updateMember(id, member);
        expect(updated).toBe(404);
    });
    test("Delete Member", async() => {
        const id = MEM_ID1;
        const updated = await members.deleteMember(id);
        expect(updated).toBe(200);
    });

    afterAll(async ()=>{
        let q1 = `DELETE FROM ${SCHEMA}.members WHERE NIC IN ('${NIC1}','${NIC2}')`;
        await conn.query(q1);
        conn.end();
        members.done();
    })

    const _executeQuery = async(query, conn) =>{
        return new Promise((resolve, reject) =>{
            conn.query(query, (err, row) =>{
                if(err)
                    reject(err);
                resolve(row);
            });
        })
    }
});
