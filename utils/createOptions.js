import fs from 'fs';

export const createOptions = ()=>{
    const sslkey = fs.readFile('ssl-key.pem',(data)=>data);
    const sslcert = fs.readFile('ssl-cert.pem',(data)=>data)

    return options = {
        key: sslkey,
        cert: sslcert
    };
}

