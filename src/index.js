const http = require("http");

const members = require("./routes/members");
const host = 'localhost';
const port = 8080;


const requestListner = async (req, res)=>{
    res.setHeader("Content-Type", "application/json");
    const reqArr = req.url.split("/");
    const path = reqArr.slice(2,reqArr.length).join("/");
    switch (reqArr[1]) {
        case 'members':
            await members.exec(path, req, res);
            break;
    
        default:
            notFound_404(req, res);
            break;
    }
}

const notFound_404 = (req, res)=>{
    res.writeHead(404,  {"Content-Type": "application/json"});
    res.end();
}

const server = http.createServer(requestListner);
server.listen(port, host, ()=>{
    console.log(`Server started on  ${host}:${port}`);
});