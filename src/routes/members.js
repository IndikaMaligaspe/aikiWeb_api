const { Stats } = require("fs");
const http = require("http");
const { resolve } = require("path");

const service = require('../services/memberService')

const exec = async (path, req, res)=>{
    const _path = path.split("?");
    return new Promise((resolve, reject)=>{
        if (_path[0] == "" && req.method === 'GET') {
            try{
                resolve(getMembers(req, res));
            } catch (err) {
                reject(err);
            }
        } else if (_path[0].match(/([0-9]+)/) && req.method === 'GET') {
            resolve(getMembersById(req, res));
        } else {
            notFound_404(req,res);
        }
    });
};

const getMembers = async (req, res) => {
    return new Promise((resolve, reject)=> {
        try{
            res.writeHead(200,  {"Content-Type": "application/json"});
            res.end(JSON.stringify({"name":"Hello World WOOOAH"}));
            resolve();
        } catch (err) {
            reject (err);
        }
        
    });
    
};

const getMembersById = async (req, res) => {
    return new Promise(async (resolve)=> {
        let status;
        let members;
        try{
            const id = req.url.split("/")[2]
            members = await service.findById(id);
            if(!members || members.length == 0)
                status = 404
            else
                status = 200;
        } catch (err) {
            status = 500;
            members = err
        }
        res.writeHead(status,  {"Content-Type": "application/json"});
        res.end(JSON.stringify(members));
        resolve();
    });
};

const notFound_404 = (req, res)=>{
    res.writeHead(404,  {"Content-Type": "application/json"});
    res.end();
}
module.exports = {exec}