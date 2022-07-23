const http = require("http");
const { resolve } = require("path");

const exec = async (path, req, res)=>{
    const _path = path.split("?");
    console.log(_path,  req.method);
    return new Promise((resolve, reject)=>{
        if (_path[0] == "getUsers" && req.method === 'GET') {
            try{
                resolve(getUsers(req, res));
            } catch (err) {
                reject(err);
            }
            
        } else if (_path[0].match(/getUsers\/([0-9]+)/) && req.method === 'GET') {
            getUserById(req, res);
        } else {
            notFound_404(req,res);
        }
    });
};

const getUsers = async (req, res) => {
    return new Promise((resolve, reject)=> {
        res.writeHead(200,  {"Content-Type": "application/json"});
        res.end(JSON.stringify({"name":"Hello World WOOOAH"}));
        resolve();
    });
    
};

const getUserById = async (req, res) => {
    return new Promise((resolve, reject)=> {
        res.writeHead(200,  {"Content-Type": "application/json"});
        res.end(JSON.stringify({"name":"Hello World WOOOAH with ID"}));
        resolve();
    });
};

const notFound_404 = (req, res)=>{
    res.writeHead(404,  {"Content-Type": "application/json"});
    res.end();
}
module.exports = {exec}