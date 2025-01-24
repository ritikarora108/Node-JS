import fs from "fs"

function logReqRes(fileName) {
    return (req, res, next)=>{
        let date = new Date();
        const msg = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${req.method} - ${req.path}\n`;
        fs.appendFile(fileName, msg, (err, result) => {
            if (err) console.log(`Error: ${err}`);
        });
        next();
    }
}
export default logReqRes;