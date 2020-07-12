import {UserList} from "./model/userList";
import {IUser} from "./model/user";
import {forEach} from "async";
const fetch = require("node-fetch");
const Async = require("async");

const maxThreads: number=2;

export class Downloader{
    private contentUrl: string
    private frequency: number
    private callback:  (user: IUser) => void

    constructor(contentUrl: string, frequency: number, userDownloaded: (user: IUser) => void) {
        this.contentUrl = contentUrl
        this.frequency = frequency
        this.callback = userDownloaded
    }

    async serve() {
        while (true) {
            let totalPages = await this.servePage(this, 1);
            let pages = this.sequence(2, totalPages)
            await this.servePages(pages)
            console.log(`downloading compelete. wait for ${this.frequency} seconds`);
            await this.sleep(this.frequency)
        }
    }

    *sequence(from: number, max: number) {
        var i=2;
        while (i <= max){
            yield  i
            i++;
        }
    }
    
    async servePages(pages: Iterable<number>) {
        var self = this;
        return new Promise((resolve, reject) => {
            Async.eachLimit(pages, maxThreads,  (page:number, callback: any) => {
                 self.servePage(self, page).then(()=>     callback())
            }, (error: any) => {
                if (error){
                    reject(error);
                } else {
                    resolve();
                }
            })
        });
    }

    async servePage(self: Downloader, page: number){
        console.log(`downloading page: ${page}`);
        var ul = new UserList(await self.http<UserList>(self.urlPage(page)));
        for (let entry of ul.data)
            self.callback(entry)
        return ul.total_pages;
    }

    urlPage(page: number): string {
        return this.contentUrl + page.toString()
    }

    async http<T>(
        request: RequestInfo
    ): Promise<T> {
        const response = await fetch(request)
        const body = await response.json()
        return body as T
    }

    sleep(s: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, s * 1000)
    });
    }
}