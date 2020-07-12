import {IStorage} from "./storage";
const http = require('http');
const url = require('url');

export class RestApi {
    private port: number
    private storage: IStorage
    constructor( port: number, storage: IStorage) {
        this.port = port
        this.storage = storage
    }

    async serve(){
        var inst = this
        http.createServer(
            async (req: any, res: any)=>
            {
                let filter = req.url.replace("/","")
                let result = await inst.storage.search(filter)

                res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'})
                res.write(JSON.stringify(result))
                res.end()
            }
        ).listen(this.port)
    }
}
