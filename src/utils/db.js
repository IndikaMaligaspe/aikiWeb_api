const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kissme',
    database:'slaia'
});

// connection.connect((err)=>{
//     if(err) 
//         throw err;
//     // console.log(`Conected to MySQL on localhost`);
// })

module.exports = {connection}