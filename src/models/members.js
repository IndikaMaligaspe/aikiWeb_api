const {connection} = require('../utils/db');

const SCHEMA = 'slaia';

const findById = async (id) =>{
    return new Promise((resolve, reject)=>{
        try{
            const query =   `SELECT id, nic, name, address, 
                            occupation, date_of_birth, date_of_join, sex
                            FROM ${SCHEMA}.members
                            WHERE id = ${id}
                            `;
                connection.query(query, (err, row) =>{
                    if(err)
                        throw err;
                    resolve(row);
                });
        } catch (err) {
            console.log(err);
            reject(err)
        }
    });
   
}

const findAll = async () =>{
    return new Promise((resolve, reject) => {
        try{
            const query =   `SELECT id, nic, name, address, 
                            occupation, date_of_birth, date_of_join, sex
                            FROM ${SCHEMA}.members
                            `;
            connection.query(query, (err, row) =>{
                if (err)
                    reject(err);
                resolve(row);
            })
        }catch (err) {
            reject(err);
        }
    });
}

const findByName = async (name) => {
    return new Promise((resolve, reject) =>{
        try{
            query = `SELECT id, nic, name, address, 
                    occupation, date_of_birth, date_of_join, sex
                    FROM ${SCHEMA}.members
                    WHERE name = '${name}'
                    `;
            connection.query(query, (err, row)=>{
                if(err) reject(err)
                resolve(row)
            })
        }catch(err){
            reject(err);
        }
    })
}

const createMember = async (member) =>{
    return new Promise((resolve, reject) => {
        try{
            const query = `INSERT INTO ${SCHEMA}.members
            (nic, name, address, occupation, date_of_join, date_of_birth, sex)
            VALUES (?)`;
            let values = [
                member['nic'],
                member['name'],
                member['address'],
                member['occupation'],
                member['date_of_join'],
                member['date_of_birth'],
                member['sex'],
            ]    
            connection.query(query,[values], async (err,row) =>{
                if(err) reject(err);
                resolve(row.insertId);
            });

        } catch (err) {
            reject (err);
        }

    })
}

const done = () =>{
    try{
        connection.end();
    }catch(err) {
        throw err;
    }
}
module.exports = {
    findById,
    findAll,
    findByName,
    createMember,
    done
}